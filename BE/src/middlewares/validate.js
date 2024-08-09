import Joi from 'joi';
import { BadRequestError } from './custom-error.js';

const validate =
  (schema, property = 'body') =>
  (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      throw new BadRequestError(
        `Validation error: ${error.details[0].message}`
      );
    }
    next();
  };

export default validate;
