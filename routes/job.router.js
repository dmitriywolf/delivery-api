import express from 'express';
import {
  getAllJobs,
  getTopJobs,
  getJobById,
  createJob,
  getJobsByEmployerId,
  getMyVacancies,
} from '#root/controllers/job.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/top', getTopJobs);
router.get('/:id', getJobById);
router.post('/', checkAuth, createJob);

router.get('/user/:id', checkAuth, getJobsByEmployerId);

router.get('/employer/all', checkAuth, getMyVacancies);

export default router;
