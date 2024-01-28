import express from 'express';
import {
  getAllResumes,
  getResumeById,
  updateResume,
  getMyResume,
} from '#root/controllers/resume.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', getAllResumes);
router.get('/:id', getResumeById);
router.get('/my/resume', checkAuth, getMyResume);
router.patch('/:id', checkAuth, updateResume);

export default router;
