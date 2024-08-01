import Joi from 'joi';

export const LikeJoi = Joi.object({
  userId: Joi.string().required(),
  boardId: Joi.string().required(),
});
