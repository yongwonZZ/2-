import express from 'express';
import { isLiked, toggleLike } from '../services/like-service.js';

const router = express.Router();

router.get('/is-liked', isLiked); // 좋아요 여부 확인
router.post('/toggle', toggleLike); // 좋아요 추가 및 취소

export default router;
