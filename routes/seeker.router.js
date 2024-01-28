import express from 'express';
import { updateSeeker } from '#root/controllers/seeker.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.patch('/:id', checkAuth, updateSeeker);

export default router;
