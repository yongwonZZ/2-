import express from 'express';
import {
  getBoardList,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardListByCategory, // 추가된 부분
} from '../services/board-service.js';

const router = express.Router();

router.get('/', getBoardList); // 게시글 목록 조회
router.get('/:id', getBoard); // 게시글 상세 조회
router.get('/category/:category', getBoardListByCategory); // 카테고리별 게시글 목록 조회
router.post('/', createBoard); // 게시글 작성
router.put('/:id', updateBoard); // 게시글 수정
router.delete('/:id', deleteBoard); // 게시글 삭제

export default router;
