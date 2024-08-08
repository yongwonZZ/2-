import asyncHandler from 'express-async-handler';
import { User } from '../models/model.js';
import { hashPassword } from '../middlewares/index.js';
import jwt from 'jsonwebtoken';
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
} from '../middlewares/custom-error.js';
import crypto from 'crypto';
import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.ACCESS_SECRET;
const PORT = process.env.PORT || 5000;

// AWS SES 설정
const ses = new aws.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// 비밀번호 재설정 토큰 생성 함수
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// 회원 가입
export const signup = asyncHandler(async (req, res) => {
  const { email, userName, password, phoneNumber, role } = req.body;

  const userJoin = await User.findOne({ email });
  if (userJoin) throw new BadRequestError('이미 가입하신 회원입니다.');

  const hashedPassword = hashPassword(password); // 비밀번호 해쉬값 만들기
  const user = await User.create({
    email,
    userName,
    password: hashedPassword,
    phoneNumber,
    role,
  });
  res.json({ message: `${user.userName}님 회원 가입에 성공하셨습니다!` });
});

// 로그인
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user === null) {
    throw new NotFoundError('이메일 또는 비밀번호 불일치입니다.');
  }

  if (user.password !== hashPassword(password)) {
    throw new UnauthorizedError('이메일 또는 비밀번호 불일치입니다.');
  }

  // 토큰 생성
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      permission: user.permission,
    },
    secret,
    { expiresIn: '1h' }
  );

  res.json({
    message: `${user.userName}님 환영합니다!`,
    token, // 응답 데이터에 토큰 포함
    user: {
      email: user.email,
      userName: user.userName,
    },
  });
});

// 로그아웃
export const logout = asyncHandler(async (req, res) => {
  res.json({ message: '이용해주셔서 감사합니다.' });
});

// 회원 목록 조회 (관리자)
export const getUserList = asyncHandler(async (req, res) => {
  const users = await User.find({}).limit(20);
  if (users.length === 0) {
    throw new NotFoundError('요청하신 데이터가 존재하지 않습니다.');
  }
  res.json(users);
});

// 회원 조회
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new NotFoundError('사용자가 존재하지 않습니다.');
  }
  res.json(user);
});

// 회원 수정
export const updateUser = asyncHandler(async (req, res) => {
  const { password, ...rest } = req.body;

  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('사용자를 찾을 수 없습니다.');
  }
  if (password) {
    const hashedPassword = hashPassword(password);
    rest.password = hashedPassword;
  }
  const updatedUser = await User.updateOne({ _id: userId }, { $set: rest });
  if (updatedUser.modifiedCount === 0) {
    throw new InternalServerError('회원 정보 수정 중 문제가 발생했습니다.');
  }

  res.json({ message: '회원 정보가 수정되었습니다.' });
});

// 회원 탈퇴
export const resignUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new NotFoundError('사용자를 찾을 수 없습니다.');
  }

  res.json({ message: '회원에서 탈퇴하셨습니다.' });
});

// 회원 삭제(탈퇴) - 소프트 삭제
export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('사용자를 찾을 수 없습니다.');
  }
  if (user.deleteAt !== null) {
    throw new NotFoundError('이미 삭제된 데이터입니다.');
  }
  user.deleteAt = Date.now();
  await user.save();

  res.json({ message: '사용자 데이터가 삭제되었습니다.' });
});

// 회원 찾기(전화번호)
export const findUser = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.query;
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new NotFoundError('사용자를 찾을 수 없습니다.');
  }
  res.json({ email: user.email });
});

// 비밀번호 재설정 요청 처리
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('사용자를 찾을 수 없습니다.');
  }

  const resetToken = generateResetToken();
  const resetPasswordExpires = Date.now() + 3600000; // 1시간 유효

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetPasswordExpires;
  await user.save();

  const resetUrl = `http://localhost:${PORT}/reset-password/${resetToken}`;
  //const resetUrl = `http://http://34.22.80.21//reset-password/${resetToken}`; 로 바꿔줘야
  const params = {
    Source: 'shin08250867@gmail.com', // 검증된 이메일 주소
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: '비밀번호 재설정 요청',
      },
      Body: {
        Html: {
          Data: `<p>다음 링크를 클릭하여 비밀번호를 재설정하세요:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
        },
      },
    },
  };

  try {
    await ses.sendEmail(params).promise();
    res.json({ message: '비밀번호 재설정 이메일이 전송되었습니다.' });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new InternalServerError('이메일 전송 중 오류가 발생했습니다.');
  }
});

// 비밀번호 재설정 처리
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new BadRequestError('토큰이 유효하지 않거나 만료되었습니다.');
  }

  user.password = hashPassword(newPassword);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
});
