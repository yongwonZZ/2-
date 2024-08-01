import asyncHandler from 'express-async-handler';
import { Category } from '../models/model.js';
import { NotFoundError, BadRequestError } from '../middlewares/custom-error.js';

// 카테고리 목록 조회
export const getCategoryList = asyncHandler(async (req, res) => {
  const categoryList = await Category.find();
  res.json(categoryList);
});

// id로 카테고리 조회
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) throw new NotFoundError('해당 카테고리가 존재하지 않습니다.');
  res.json(category);
});
