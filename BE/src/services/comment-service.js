import asyncHandler from 'express-async-handler';
import { Comment, Board } from '../models/model.js';
import { NotFoundError } from '../middlewares/custom-error.js';

// 댓글 목록 조회 (페이지네이션 적용)
export const getCommentList = asyncHandler(async (req, res) => {
  const { boardId } = req.params; // 게시글 ID를 경로에서 가져옴
  const { page = 1, limit = 10 } = req.query;

  const commentList = await Comment.find({ boardId })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 }); // 최신 댓글이 먼저 오도록 정렬

  const total = await Comment.countDocuments({ boardId }); // 해당 게시글의 총 댓글 수
  res.json({ total, page: Number(page), limit: Number(limit), commentList });
});

// 댓글 작성
export const createComment = asyncHandler(async (req, res) => {
  const { userId, contents, boardId } = req.body;

  const board = await Board.findById(boardId);
  if (!board) throw new NotFoundError('해당 게시글이 존재하지 않습니다.');
  const comment = await Comment.create({ userId, contents, boardId });
  res.json({ message: '댓글이 작성되었습니다.', comment });
});

// 댓글 삭제
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) throw new NotFoundError('해당 댓글이 존재하지 않습니다.');
  res.json({ message: '댓글이 삭제되었습니다.', comment });
});
