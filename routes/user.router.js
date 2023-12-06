import express from 'express';
import { getMe } from '#root/controllers/users.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/me', checkAuth, getMe);

export default router;
