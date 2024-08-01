import asyncHandler from 'express-async-handler';
import { Board } from '../models/model.js';
import { NotFoundError, BadRequestError } from '../utils/custom-error.js';

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

// 게시글 작성
export const createBoard = asyncHandler(async (req, res) => {
  const { userName, category, contents } = req.body;
  const board = await Board.create({ userName, category, contents });
  res.json({ message: '게시글이 작성되었습니다.', board });
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
