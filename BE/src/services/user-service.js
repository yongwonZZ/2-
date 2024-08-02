import asyncHandler from 'express-async-handler';
import { User } from '../models/model.js';
import hashPassword from '../middlewares/hash-password.js';
import jwt from 'jsonwebtoken';
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
} from '../middlewares/custom-error.js';
const secret = process.env.ACCESS_SECRET;

// 회원 가입
export const signup = asyncHandler(async (req, res) => {
  const { email, userName, password, role } = req.body;
  const userJoin = await User.findOne({ email });
  if (userJoin) throw new BadRequestError('이미 가입하신 회원입니다.');

  const hashedPassword = hashPassword(password); // 비밀번호 해쉬값 만들기
  const user = await User.create({
    email,
    userName,
    password: hashedPassword,
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
    res.status(401);
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

  res.cookie('accessToken', token, { maxAge: 3600000 });
  res.json({ message: `${user.userName}님 환영합니다!` });
});

// 로그아웃
export const logout = asyncHandler(async (req, res) => {
  res.cookie('accessToken', null, { maxAge: 0 });
  // if (res.cookie.accessToken) {
  //   res.status(500);
  //   throw new InternalServerError('정상적으로 로그 아웃이 되지 않았습니다.');
  // }
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
    throw new InternalServerError('서버 오류입니다.');
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
