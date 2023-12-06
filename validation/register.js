import { body } from 'express-validator';

const registerValidation = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'At least 8 characters').isLength({ min: 8 }),
  body('firstName', 'First name is required').isLength({ min: 3 }),
  body('lastName', 'Last name is required').isLength({ min: 2 }),
];

export default registerValidation;
