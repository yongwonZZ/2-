import express from 'express';
import {
  getBoardList,
  getBoard,
  createBoard,
  deleteBoard,
  generatePresignedUrl,
} from '../services/board-service.js';
import { permission, validate } from '../middlewares/index.js';
import { BoardJoi, PaginationJoi } from '../models/joi-schemas/index.js';

const router = express.Router();

router.get('/presigned-url', generatePresignedUrl); // 이미지 업로드를 위한 presigned url 생성 (권한 필요)
router.get('/', validate(PaginationJoi), getBoardList); // 게시글 목록 조회 (카테고리별 조회 포함)
router.get('/:id', getBoard); // 게시글 상세 조회
router.post('/', permission('user'), validate(BoardJoi), createBoard); // 게시글 작성 (권한 필요)
router.delete('/:id', permission('user'), deleteBoard); // 게시글 삭제 (권한 필요)

export default router;
