import Joi from 'joi';

export const BoardJoi = Joi.object({
  userId: Joi.string().required(),
  boardId: Joi.string().required(),
  contents: Joi.string().min(1).max(100).required(),
  category: Joi.string().required(),
  img: Joi.string().required(),
  like: Joi.number().default(0),
});
