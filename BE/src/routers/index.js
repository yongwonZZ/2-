import express from 'express';
import userRouter from '../routers/user-router.js';
import authRouter from '../routers/auth-router.js';
import { signup, login, logout } from '../services/user-service.js';
import permission from '../middlewares/permission.js'; // 유저인증 & 권한 체크

const router = express.Router();

// 각 라우터 연결
router.use('/users', userRouter);

// 메인 페이지 및 상품 조회(비회원 기능)
// router.get('/', CategoryAndProducts); // 전체 카테고리 & 상품 목록 조회

export default router;
