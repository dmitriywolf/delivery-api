import express from 'express';
import { createMessage } from '#root/controllers/message.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.post('/:chatId', checkAuth, createMessage);

export default router;
