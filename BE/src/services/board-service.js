import asyncHandler from 'express-async-handler';
import { Board } from '../models/model.js';
import { NotFoundError, BadRequestError } from '../middlewares/custom-error.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// 게시글 목록 조회
export const getBoardList = asyncHandler(async (req, res) => {
  const boardList = await Board.find();
  res.json(boardList);
});

// 게시글 상세 조회
export const getBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const board = await Board.findById(id);
  if (!board) throw new NotFoundError('해당 게시글이 존재하지 않습니다.');
  res.json(board);
});

// 카테고리별 게시글 목록 조회
export const getBoardListByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const boardList = await Board.find({ category });
  res.json(boardList);
});

// 게시글 작성
export const createBoard = asyncHandler(async (req, res) => {
  const { userName, category, contents } = req.body;

  // S3 presigned URL 생성
  const s3Params = {
    Bucket: 'shin08250867', // S3 버킷 이름
    Key: `images/${Date.now()}`, // 업로드될 파일 이름
    ContentType: 'image/jpeg', // 업로드될 파일의 MIME 타입
  };

  const command = new PutObjectCommand(s3Params);
  const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 300 });

  const board = await Board.create({ userName, category, contents });

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

// // 게시글 수정
// export const updateBoard = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { title, content } = req.body;
//   const board = await Board.findByIdAndUpdate(
//     id,
//     { title, content },
//     { new: true }
//   );
//   if (!board) throw new NotFoundError('해당 게시글이 존재하지 않습니다.');
//   res.json({ message: '게시글이 수정되었습니다.', board });
// });
