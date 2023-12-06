import { body } from 'express-validator';

const loginValidation = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'At least 8 characters').isLength({ min: 8 }),
];

export default loginValidation;
