import { body } from 'express-validator';

const loginValidation = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'At least 5 characters').isLength({ min: 5 }),
];

export default loginValidation;
