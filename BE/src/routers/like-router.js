import express from 'express';
import { isLiked, toggleLike } from '../services/like-service.js';
import { permission, validate } from '../middlewares/index.js';
import { LikeJoi } from '../models/joi-schemas/like-joi.js';

const router = express.Router();

router.get('/', isLiked); // 좋아요 여부 확인
router.post('/toggle', permission('user'), validate(LikeJoi), toggleLike); // 좋아요 추가 및 취소

export default router;
