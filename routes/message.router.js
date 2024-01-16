import express from 'express';
import {
  // getChatMessages,
  createMessage,
} from '#root/controllers/message.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

// router.get('/:chatId', checkAuth, getChatMessages);
router.post('/:chatId', checkAuth, createMessage);

export default router;
