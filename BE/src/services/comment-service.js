// comment-controller.js
import asyncHandler from 'express-async-handler';
import { Comment, Board } from '../models/model.js';
import { NotFoundError } from '../middlewares/custom-error.js';

// 댓글 목록 조회 (페이지네이션 적용)
export const getCommentList = asyncHandler(async (req, res) => {
  const { boardId } = req.params; // 게시글 ID를 경로에서 가져옴
  const { page = 1, limit = 10 } = req.query;

  // boardId가 유효한 ObjectId인지 확인
  if (!mongoose.Types.ObjectId.isValid(boardId)) {
    throw new BadRequestError('유효하지 않은 게시글 ID입니다.');
  }

  const boardObjectId = new mongoose.Types.ObjectId(boardId);

  // 게시글이 존재하는지 확인
  const board = await Board.findById(boardObjectId);
  if (!board) throw new NotFoundError('해당 게시글이 존재하지 않습니다.');

  // 댓글 목록 조회
  const commentList = await Comment.find({ boardId: boardObjectId })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .sort({ createdAt: -1 }); // 최신 댓글이 먼저 오도록 정렬

  // 총 댓글 수 조회
  const total = await Comment.countDocuments({ boardId: boardObjectId });

  // 각 댓글에 대해 userName을 추가
  const commentListWithUserNames = await Promise.all(
    commentList.map(async (comment) => {
      const user = await User.findById(comment.userId);
      return { ...comment._doc, userName: user ? user.userName : 'Unknown' };
    })
  );

  // 결과 반환
  res.json({
    total,
    page: Number(page),
    limit: Number(limit),
    commentList: commentListWithUserNames,
  });
});

// 댓글 작성
export const createComment = asyncHandler(async (req, res) => {
  const { userId, contents, boardId } = req.body;

  const board = await Board.findById(boardId);
  if (!board) throw new NotFoundError('해당 게시글이 존재하지 않습니다.');
  const comment = await Comment.create({ userId, contents, boardId });
  res.json({ message: '댓글이 작성되었습니다.', comment });
});

// 댓글 삭제
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // id가 유효한 ObjectId인지 확인
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError('유효하지 않은 댓글 ID입니다.');
  }

  const commentObjectId = new mongoose.Types.ObjectId(id);

  // 댓글이 존재하는지 확인하고 삭제
  const comment = await Comment.findByIdAndDelete(commentObjectId);
  if (!comment) throw new NotFoundError('해당 댓글이 존재하지 않습니다.');

  // userId를 사용하여 사용자 정보 조회
  const user = await User.findById(comment.userId);
  if (!user) throw new NotFoundError('해당 사용자가 존재하지 않습니다.');

  // 응답에 userName 추가
  res.json({
    message: '댓글이 삭제되었습니다.',
    comment: { ...comment._doc, userName: user.userName },
  });
});
