import asyncHandler from 'express-async-handler';
import { Like, Board } from '../models/model.js';
import mongoose from 'mongoose';

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
  const { userId, boardId } = req.body;

  // boardId가 유효한 ObjectId인지 확인
  if (!mongoose.Types.ObjectId.isValid(boardId)) {
    return res.status(400).json({ message: '유효하지 않은 boardId입니다.' });
  }

  const boardObjectId = new mongoose.Types.ObjectId(boardId);

  // userId와 boardId를 사용하여 좋아요 찾기
  const like = await Like.findOne({ userId, boardId: boardObjectId });

  if (like) {
    // 좋아요가 존재하면 삭제 (좋아요 취소)
    await Like.deleteOne({ _id: like._id });
    const updatedBoard = await Board.findByIdAndUpdate(
      boardObjectId,
      { $inc: { like: -1 } },
      { new: true }
    );

    console.log(`좋아요 취소: ${updatedBoard.like}`);

    // 좋아요 취소 상태 반환
    return res.json({ liked: false });
  } else {
    // 좋아요가 존재하지 않으면 새로 생성 (좋아요 추가)
    const newLike = await Like.create({ userId, boardId: boardObjectId });
    const updatedBoard = await Board.findByIdAndUpdate(
      boardObjectId,
      { $inc: { like: 1 } },
      { new: true }
    );

    console.log(`좋아요 추가: ${updatedBoard.like}`);

    // 좋아요 추가 상태 반환
    return res.json({ liked: true });
  }
});
