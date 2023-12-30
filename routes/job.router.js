import express from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  getMyVacancies,
} from '#root/controllers/job.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', checkAuth, createJob);
router.patch('/:id', checkAuth, updateJob);

router.get('/employer/all', checkAuth, getMyVacancies);

export default router;
