import express from 'express';
import {
  getBoardList,
  getBoard,
  getBoardListByCategory,
  createBoard,
  // updateBoard,
  deleteBoard,
} from '../services/board-service.js';
import permission from '../middlewares/permission.js';

const router = express.Router();

router.get('/', getBoardList); // 게시글 목록 조회 수정필요
router.get('/:id', getBoard); // 게시글 상세 조회
router.get('/:category', getBoardListByCategory); // 카테고리별 게시글 목록 조회 수정필요
router.post('/', permission('user'), createBoard); // 게시글 작성 (권한 필요)
// router.put('/:id', updateBoard); // 게시글 수정
router.delete('/:id', permission('user'), deleteBoard); // 게시글 삭제 (권한 필요)

export default router;
