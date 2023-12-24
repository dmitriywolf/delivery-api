import express from 'express';
import {
  getAllResumes,
  getResumeById,
  updateResumeById,
  getResumeByUserId,
} from '#root/controllers/resume.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', getAllResumes);
router.get('/:id', getResumeById);
router.patch('/:id', checkAuth, updateResumeById);
router.get('/user/:id', checkAuth, getResumeByUserId);

export default router;
