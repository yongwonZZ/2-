import asyncHandler from 'express-async-handler';
import { Board } from '../models/model.js';
import { NotFoundError } from '../middlewares/custom-error.js';
import s3Client from '../../s3Config.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

dotenv.config();

// 게시글 목록 조회 (페이지네이션 및 카테고리별 조회 적용)
export const getBoardList = asyncHandler(async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const query = category ? { category } : {};

  const boardList = await Board.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await Board.countDocuments(query);
  res.json({ total, page: Number(page), limit: Number(limit), boardList });
});

// 게시글 상세 조회
export const getBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const board = await Board.findById(id);
  if (!board) throw new NotFoundError('해당 게시글이 존재하지 않습니다.');
  res.json(board);
});

// 게시글 작성
export const createBoard = asyncHandler(async (req, res) => {
  const { userName, category, contents, img } = req.body;

  // S3 presigned URL 생성
  const s3Params = {
    Bucket: 'shin08250867', // S3 버킷 이름
    Key: `images/${Date.now()}`, // 업로드될 파일 이름
    ContentType: 'image/jpeg', // 업로드될 파일의 MIME 타입
  };

  const command = new PutObjectCommand(s3Params);
  const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 300 });

  const board = await Board.create({ userName, category, contents, img });

  res.json({
    message: '게시글이 작성되었습니다.',
    board,
    uploadURL, // 프론트엔드로 presigned URL 반환
  });
});

// 게시글 삭제
export const deleteBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const board = await Board.findByIdAndDelete(id);
  if (!board) throw new NotFoundError('해당 게시글이 존재하지 않습니다.');
  res.json({ message: '게시글이 삭제되었습니다.', board });
});
