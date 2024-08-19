import express from 'express';
import {
  getCommentList,
  createComment,
  deleteComment,
} from '../services/comment-service.js';
import { permission, validate } from '../middlewares/index.js';
import { CommentJoi, PaginationJoi } from '../models/joi-schemas/index.js';

const router = express.Router();

router.get('/:boardId', validate(PaginationJoi), getCommentList); // 댓글 목록 조회(쿼리스트링, 페이지네이션)
router.post(
  '/:boardId',
  permission('user'),
  validate(CommentJoi),
  createComment
); // 댓글 작성
router.delete('/:boardId/:id', permission('user'), deleteComment); // 댓글 삭제

export default router;
