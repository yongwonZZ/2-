import asyncHandler from 'express-async-handler';
import { Like } from '../models/model.js';

//좋아요 상태 확인
export const checkLike = asyncHandler(async (req, res) => {
  const { userId, boardId } = req.body;
  const like = await Like.findOne({ userId, boardId });
  res.json({ liked: !!like });
});

//좋아요 수 조회 지워도 된다?
export const getLikeCount = asyncHandler(async (req, res) => {
  const { boardId } = req.body;
  const likeCount = await Like.find({ board: boardId }).countDocuments();
  res.json({ likeCount });
});

// 좋아요 (누르면 보드 스키마에 좋아요 수 +1)
export const like = asyncHandler(async (req, res) => {
  const { userId, boardId } = req.body;
  const like = await Like.findOne({ userId, boardId });
  if (like) {
    await like.create({ userId, boardId });
  }
  const likeCount = await Like.find({ boardId }).countDocuments();
  res.json({ liked: true, likeCount }); //반대, 카운트 필요없다
});

// 좋아요 취소
export const unlike = asyncHandler(async (req, res) => {
  const { userId, boardId } = req.body;
  await Like.findOneAndDelete({ userId, boardId });
  const likeCount = await Like.find({ boardId }).countDocuments();
  res.json({ liked: false, likeCount }); //반대, 카운트 필요없다
});
