import express from 'express';
import { register, login } from '#root/controllers/authController.js';
import { registerValidation, loginValidation } from '#root/validation/index.js';
import { handleValidationErrors } from '#root/middleware/index.js';

const router = express.Router();

router.post('/login', loginValidation, handleValidationErrors, login);
router.post('/register', registerValidation, handleValidationErrors, register);

export default router;
