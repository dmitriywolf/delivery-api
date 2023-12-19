import express from 'express';
import {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getMe,
} from '#root/controllers/auth.controller.js';
import {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  verifyEmailValidation,
  resetPasswordValidation,
} from '#root/validation/index.js';
import { handleValidationErrors, checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/me', checkAuth, getMe);
router.post('/login', loginValidation, handleValidationErrors, login);
router.post('/register', registerValidation, handleValidationErrors, register);
router.post('/verify-email', verifyEmailValidation, handleValidationErrors, verifyEmail);
router.post('/forgot-password', forgotPasswordValidation, handleValidationErrors, forgotPassword);
router.post('/reset-password', resetPasswordValidation, handleValidationErrors, resetPassword);

export default router;
