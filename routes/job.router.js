import express from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  getMyVacancies,
  applyToJob,
  getMyApplications,
  getTotalJobsCount,
} from '#root/controllers/job.controller.js';
import { checkAuth, checkIsSeeker } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/total', getTotalJobsCount);
router.get('/:id', getJobById);
router.post('/', checkAuth, createJob);
router.patch('/:id', checkAuth, updateJob);

router.get('/employer/all', checkAuth, getMyVacancies);

router.post('/apply-job/:id', checkAuth, checkIsSeeker, applyToJob);
router.get('/applications/my', checkAuth, checkIsSeeker, getMyApplications);

export default router;
