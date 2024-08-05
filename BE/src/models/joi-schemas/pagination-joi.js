import Joi from 'joi';

export const PaginationJoi = Joi.object({
  boardId: Joi.string().required(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
});
