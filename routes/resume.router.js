import express from 'express';
import {
  getAllResumes,
  getResumeById,
  updateResumeById,
  getResumeByOwnerId,
} from '#root/controllers/resume.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', getAllResumes);
router.get('/:id', getResumeById);
router.patch('/:id', checkAuth, updateResumeById);
router.get('/owner/:id', checkAuth, getResumeByOwnerId);

export default router;
