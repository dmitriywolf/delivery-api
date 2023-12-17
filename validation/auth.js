import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'At least 8 characters').isLength({ min: 8 }),
];

export const registerValidation = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'At least 8 characters').isLength({ min: 8 }),
  body('firstName', 'First name is required').isLength({ min: 2 }),
  body('lastName', 'Last name is required').isLength({ min: 2 }),
  body('role', 'Role is required').isString(),
];

export const verifyEmailValidation = [body('code', 'Code is required').isString()];

export const forgotPasswordValidation = [body('email', 'Invalid email').isEmail()];

export const resetPasswordValidation = [
  body('code', 'Code is required').isString(),
  body('password', 'At least 8 characters').isLength({ min: 8 }),
];
