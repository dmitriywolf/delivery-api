import express from 'express';
import { getAllJobs, getJobById, createJob } from '#root/controllers/job.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', checkAuth, createJob);

export default router;
