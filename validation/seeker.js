import { body } from 'express-validator';

export const updateSeekerValidation = [
  body('firstName', 'Min 2 characters').isLength({ min: 2 }),
  body('lastName', 'Min 2 charactes').isLength({ min: 2 }),
  body('phone', 'Invalid phone').isMobilePhone(),
  body('linkedin', 'Invalid url').isURL(),
  body('searchStatus', 'Invalid status').isString().optional(),
  body('skype', 'Invalid style login').isString(),
  body('telegram', 'Invalid telegram login').isString(),
  body('github', 'Invalid github').isURL(),
  body('portfolio', 'Invalid portfolio').isURL(),
];
