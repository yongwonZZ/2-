import asyncHandler from 'express-async-handler';
import { Like, Board } from '../models/model.js';
import { LikeJoi } from '../models/joi-schemas/like-joi.js';
import { BadRequestError } from '../middlewares/custom-error.js';

// 좋아요 상태 확인
export const isLiked = asyncHandler(async (req, res) => {
  const { userId, boardId } = req.query;

  // 좋아요 여부 확인
  const like = await Like.findOne({ userId, boardId });

  // 좋아요 여부 상태 반환
  if (like) {
    return res.json({ liked: true });
  } else {
    return res.json({ liked: false });
  }
});

// 좋아요 추가 및 취소
export const toggleLike = asyncHandler(async (req, res) => {
  const { error, value } = LikeJoi.validate(req.query);
  if (error) {
    throw new BadRequestError(`Validation error: ${error.details[0].message}`);
  }
  const { userId, boardId } = value;

  // 좋아요가 이미 존재하는지 확인
  const like = await Like.findOne({ userId, boardId });

  if (like) {
    // 좋아요가 존재하면 삭제 (좋아요 취소)
    await Like.deleteOne({ userId, boardId });
    await Board.findByIdAndUpdate(boardId, { $inc: { like: -1 } });

    // 좋아요 취소 상태 반환
    return res.json({ liked: false });
  } else {
    // 좋아요가 존재하지 않으면 새로 생성 (좋아요 추가)
    await Like.create({ userId, boardId });
    await Board.findByIdAndUpdate(boardId, { $inc: { like: 1 } });

    // 좋아요 추가 상태 반환
    return res.json({ liked: true });
  }
});
