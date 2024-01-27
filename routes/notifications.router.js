import express from 'express';
import { getMyNotifications, readNotification } from '#root/controllers/notification.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', checkAuth, getMyNotifications);
router.post('/read', checkAuth, readNotification);

export default router;
