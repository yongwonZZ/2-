import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { User } from '../models/model.js';

const secret = process.env.ACCESS_SECRET;

// 토큰&권한 체크
const permission = (role) =>
  asyncHandler(async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
      // 쿠키에 토큰 존재 여부
      return res.status(401).json({ message: '인증되지 않은 유저입니다.' });
    }

    const decoded = jwt.verify(token, secret); // 토큰 검사
    const user = await User.findById(decoded.id).select('-password'); // req.user에 유저 할당

    if (!user) {
      return res.status(401).json({ message: '유효하지 않은 유저입니다.' });
    }

    req.user = user;

    // 권한 유무 체크
    if (role === 'user' || (role === 'admin' && user.role === 'admin')) {
      return next();
    } else {
      return res.status(403).json({ message: '접근이 제한되었습니다.' });
    }
  });

export default permission;
