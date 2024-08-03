import asyncHandler from 'express-async-handler';
import { Comment, Board } from '../models/model.js';
import { NotFoundError, BadRequestError } from '../middlewares/custom-error.js';

// 댓글 목록 조회
export const getCommentList = asyncHandler(async (req, res) => {
  const commentList = await Comment.find();
  res.json(commentList);
});

// 댓글 조회
export const getComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) throw new NotFoundError('해당 댓글이 존재하지 않습니다.');
  res.json(comment);
});

// 댓글 작성
export const createComment = asyncHandler(async (req, res) => {
  const { userName, contents, boardId } = req.body;
  const board = await Board.findById(boardId);
  if (!board) throw new NotFoundError('해당 게시글이 존재하지 않습니다.');
  const comment = await Comment.create({ userName, contents, boardId });
  res.json({ message: '댓글이 작성되었습니다.', comment });
});

// 댓글 삭제
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) throw new NotFoundError('해당 댓글이 존재하지 않습니다.');
  res.json({ message: '댓글이 삭제되었습니다.', comment });
});

// export const updateComment = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { contents } = req.body;
//   const comment = await Comment.findByIdAndUpdate(
//     id, { contents }, { new: true });
//   if (!comment) throw new NotFoundError('해당 댓글이 존재하지 않습니다.');
//   res.json({ message: '댓글이 수정되었습니다.', comment });
// });
