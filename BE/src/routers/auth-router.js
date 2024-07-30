import express from 'express';
import { signup, login, logout } from '../services/user-service.js';

const router = express.Router();

router.post('/signup', signup); // 회원가입
router.post('/login', login); // 로그인
router.delete('/logout', logout); // 로그아웃

export default router;
