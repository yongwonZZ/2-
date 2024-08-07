import asyncHandler from 'express-async-handler';
import { Board, User } from '../models/model.js'; // User 모델을 추가
import { NotFoundError } from '../middlewares/custom-error.js';
import s3Client from '../../s3Config.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import mongoose from 'mongoose';

dotenv.config();

// 게시글 목록 조회 (페이지네이션 및 카테고리별 조회 적용)
export const getBoardList = asyncHandler(async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const query = category ? { category } : {};

  const boardList = await Board.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await Board.countDocuments(query);

  // 각 게시글에 대해 userName을 추가
  const boardListWithUserNames = await Promise.all(
    boardList.map(async (board) => {
      const user = await User.findById(board.userId);
      return { ...board._doc, userName: user ? user.userName : 'Unknown' };
    })
  );

  res.json({
    total,
    page: Number(page),
    limit: Number(limit),
    boardList: boardListWithUserNames,
  });
});

// 게시글 상세 조회
export const getBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const board = await Board.findById(id);
  if (!board) throw new NotFoundError('해당 게시글이 존재하지 않습니다.');

  // userId를 사용하여 사용자 정보 조회
  const user = await User.findById(board.userId);
  if (!user) throw new NotFoundError('해당 사용자가 존재하지 않습니다.');

  res.json({ ...board._doc, userName: user.userName });
});

// 프리사인드 URL 생성
export const generatePresignedUrl = asyncHandler(async (req, res) => {
  const { fileName, fileType } = req.query;

  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `images/${Date.now()}_${fileName}`,
    ContentType: fileType,
  };

  const command = new PutObjectCommand(s3Params);
  const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 600 }); //너무 금방 끝나서 변경

  res.status(200).json({ uploadURL, key: s3Params.Key });
});

// 게시글 작성
export const createBoard = asyncHandler(async (req, res) => {
  const { userId, category, contents, img } = req.body;

  if (!userId || !category || !contents) {
    throw new BadRequestError('필수 필드가 누락되었습니다.');
  }

  try {
    const board = await Board.create({ userId, category, contents, img });

    // 사용자 정보 조회
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError('해당 사용자가 존재하지 않습니다.');

    res.json({
      message: '게시글이 작성되었습니다.',
      board: { ...board._doc, userName: user.userName },
    });
  } catch (error) {
    throw new InternalServerError('게시글 작성 중 문제가 발생했습니다.');
  }
});

// 게시글 삭제
export const deleteBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError('유효하지 않은 게시글 ID입니다.');
  }

  try {
    const board = await Board.findByIdAndDelete(id);
    if (!board) throw new NotFoundError('해당 게시글이 존재하지 않습니다.');

    // userId를 사용하여 사용자 정보 조회
    const user = await User.findById(board.userId);
    if (!user) throw new NotFoundError('해당 사용자가 존재하지 않습니다.');

    res.json({
      message: '게시글이 삭제되었습니다.',
      board: { ...board._doc, userName: user.userName },
    });
  } catch (error) {
    throw new InternalServerError('게시글 삭제 중 문제가 발생했습니다.');
  }
});
