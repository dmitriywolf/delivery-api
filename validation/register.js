import { body } from 'express-validator';

const registerValidation = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'At least 5 characters').isLength({ min: 5 }),
  body('fullName', 'Fullname is required').isLength({ min: 3 }),
];

export default registerValidation;
