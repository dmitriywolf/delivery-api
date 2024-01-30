import express from 'express';
import { getMyChats, createChat, getChat } from '#root/controllers/chat.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', checkAuth, getMyChats);
router.get('/:id', checkAuth, getChat);

router.post('/', checkAuth, createChat);

export default router;
