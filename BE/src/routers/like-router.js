import express from 'express';
import {
  checkLike,
  getLikeCount,
  like,
  unlike,
} from '../services/like-service.js';

const router = express.Router();

router.get('/status/:userId/:boardId', checkLike); // 좋아요 상태 확인
router.get('/count/:boardId', getLikeCount); // 좋아요 수 조회
router.post('/like', like); // 좋아요
router.delete('/unlike', unlike); // 좋아요 취소

export default router;
