import express from 'express';
import userRouter from '../routers/user-router.js';
import likeRouter from '../routers/like-router.js';
import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  findUser,
} from '../services/user-service.js';
import permission from '../middlewares/permission.js';
import boardRouter from './board-router.js';
import commentRouter from './comment-router.js'; // 유저인증 & 권한 체크
import validate from '../middlewares/validate.js';
import {
  RegisterJoi,
  LoginJoi,
  ForgotPasswordJoi,
  ResetPasswordJoi,
} from '../models/joi-schemas/user-joi.js';

const router = express.Router();

// api/하위경로로 라우팅
router.post('/signup', validate(RegisterJoi), signup); // 회원가입

router.post('/login', validate(LoginJoi), login); // 로그인

router.delete('/logout', logout); // 로그아웃

router.get('/find-user', findUser); // 휴대폰 번호로 회원 조회

router.post('/forgot-password', validate(ForgotPasswordJoi), forgotPassword); // 비밀번호 재설정 요청

router.post(
  '/reset-password/:token',
  validate(ResetPasswordJoi),
  resetPassword
); // 비밀번호 재설정

// 각 라우터 연결
router.use('/users', userRouter);

router.use('/boards', boardRouter);

router.use('/comments', commentRouter);

router.use('/likes', likeRouter);

export default router;
