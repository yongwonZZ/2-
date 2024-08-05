import Joi from 'joi';

const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export const BoardJoi = Joi.object({
  userId: objectId.required(),
  contents: Joi.string().min(1).max(100).required(),
  category: Joi.string().required(),
  img: Joi.string().required(),
  like: Joi.number().default(0),
});
