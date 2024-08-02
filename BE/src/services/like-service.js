import asyncHandler from 'express-async-handler';
import { Like } from '../models/model.js';

// 좋아요
export const like = asyncHandler(async (req, res) => {
  const { userId, boardId } = req.body;
  const like = await Like.findOne({ userId });
  if (like) throw new Error('이미 좋아요를 누르셨습니다.');
  const newLike = await Like.create({ userId, boardId });
  res.json({ message: '좋아요를 누르셨습니다.', newLike });
});

// 좋아요 취소
export const unlike = asyncHandler(async (req, res) => {
  const { userId, boardId } = req.body;
  const like = await Like.findOneAndDelete({ userId, boardId });
  if (!like) throw new Error('좋아요를 누르지 않으셨습니다.');
  res.json({ message: '좋아요를 취소하셨습니다.', like });
});
