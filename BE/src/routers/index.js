import express from 'express';
import userRouter from '../routers/user-router.js';
import likeRouter from '../routers/like-router.js';
import { signup, login, logout } from '../services/user-service.js';
import permission from '../middlewares/permission.js';
import boardRouter from "./board-router.js";
import commentRouter from "./comment-router.js"; // 유저인증 & 권한 체크

const router = express.Router();

// api/하위경로로 라우팅
router.post('/signup', signup); // 회원가입
router.post('/login', login); // 로그인
router.delete('/logout', logout); // 로그아웃

// 각 라우터 연결
router.use('/users', userRouter);
router.use('/boards', boardRouter);
router.use('/comments', commentRouter);
router.use('/likes', likeRouter);

// 메인 페이지 및 상품 조회(비회원 기능)
// router.get('/', CategoryAndProducts); // 전체 카테고리 & 상품 목록 조회

export default router;
