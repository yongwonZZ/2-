import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { User } from '../models/model.js';
import {
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
} from '../middlewares/custom-error.js';

const secret = process.env.ACCESS_SECRET;

// 토큰&권한 체크
const permission = (role) =>
  asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"에서 TOKEN만 추출

    if (!token) {
      throw new UnauthorizedError('인증되지 않은 유저입니다.');
    }

    try {
      const decoded = jwt.verify(token, secret); // 토큰 검사
      const user = await User.findById(decoded.id).select('-password'); // req.user에 유저 할당

      if (!user) {
        throw new NotFoundError('유효하지 않은 유저입니다.');
      }

      req.user = user;

      // 권한 유무 체크
      if (role === 'user' || (role === 'admin' && user.role === 'admin')) {
        return next();
      } else {
        throw new ForbiddenError('접근이 제한되었습니다.');
      }
    } catch (error) {
      throw new UnauthorizedError('유효하지 않은 토큰입니다.');
    }
  });

export default permission;
