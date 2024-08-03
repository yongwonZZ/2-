import express from 'express';
import {
  getCommentList,
  createComment,
  deleteComment,
} from '../services/comment-service.js';

const router = express.Router();

router.get('/:boardId', getCommentList); // 댓글 목록 조회(쿼리스트링, 페이지네이션)
router.post('/:boardId', createComment); // 댓글 작성
router.delete('/:boardId/:id', deleteComment); // 댓글 삭제

export default router;
