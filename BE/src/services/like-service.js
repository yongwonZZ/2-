import asyncHandler from 'express-async-handler';
import { Like } from '../models/model.js';

//좋아요 상태 확인
export const checkLike = asyncHandler(async (req, res) => {
  const { userId, boardId } = req.body;
  const like = await Like.findOne({ userId, boardId });
  res.json({ liked: !!like });
});

//좋아요 수 조회
export const getLikeCount = asyncHandler(async (req, res) => {
  const { boardId } = req.body;
  const likeCount = await Like.find({ board: boardId }).countDocuments();
  res.json({ likeCount });
});

// 좋아요
export const like = asyncHandler(async (req, res) => {
  const { userId, boardId } = req.body;
  const like = await Like.findOne({ userId, boardId });
  if (like) {
    await like.create({ userId, boardId });
  }
  const likeCount = await Like.find({ boardId }).countDocuments();
  res.json({ liked: true, likeCount });
});

// 좋아요 취소
export const unlike = asyncHandler(async (req, res) => {
  const { userId, boardId } = req.body;
  await Like.findOneAndDelete({ userId, boardId });
  const likeCount = await Like.find({ boardId }).countDocuments();
  res.json({ liked: false, likeCount });
});
