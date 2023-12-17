import express from 'express';
import { getMe } from '#root/controllers/me.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', checkAuth, getMe);
// router.patch('/user/:id', checkAuth, updateUser);

export default router;
