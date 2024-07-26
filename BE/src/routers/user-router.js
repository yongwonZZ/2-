import express from 'express';
import {
  getUserList,
  updateUser,
  deleteUser,
  getUser,
  resignUser,
} from '../services/user-service.js';
import permission from '../middlewares/permission.js'; // 유저인증 & 권한 체크

const router = express.Router();

router.get('/mypage', permission('user'), getUser); // 회원 정보 조회
router.put('/mypage/:id', permission('user'), updateUser); // 회원 정보 수정
router.delete('/mypage/:id', permission('user'), resignUser); // 회원 삭제(탈퇴)

router.get('/admin', permission('admin'), getUserList); // 전체 회원 목록 조회
router.get('/admin/:id', permission('admin'), getUser); // 회원 정보 조회
router.put('/admin/:id', permission('admin'), updateUser); // 회원 정보 수정
router.delete('/admin/:id', permission('admin'), deleteUser); // 회원 삭제

export default router;
