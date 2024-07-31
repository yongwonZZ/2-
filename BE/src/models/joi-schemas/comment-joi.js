import Joi from 'joi';

export const CommentJoi = Joi.object({
  userId: Joi.string().required(),
  boardId: Joi.string().required(),
  contents: Joi.string().min(1).required(),
  like: Joi.number().default(0),
});
