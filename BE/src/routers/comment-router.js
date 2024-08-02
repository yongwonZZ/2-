import express from 'express';
import {
  getCommentList,
  getComment,
  createComment,
  deleteComment,
  // updateComment,
} from '../services/comment-service.js';

const router = express.Router();

router.get('/', getCommentList); // 댓글 목록 조회
router.get('/:id', getComment); // 댓글 상세 조회
router.post('/', createComment); // 댓글 작성
// router.put('/:id', updateComment); // 댓글 수정
router.delete('/:id', deleteComment); // 댓글 삭제

export default router;
