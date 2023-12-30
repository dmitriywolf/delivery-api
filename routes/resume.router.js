import express from 'express';
import {
  getAllResumes,
  getResumeById,
  updateResumeById,
} from '#root/controllers/resume.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', getAllResumes);
router.get('/:id', getResumeById);
router.patch('/:id', checkAuth, updateResumeById);

export default router;
