import express from 'express';
import {
  getAllEmployers,
  getEmployerById,
  updateEmployer,
  updateCompany,
} from '#root/controllers/employer.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', getAllEmployers);
router.get('/:id', getEmployerById);
router.patch('/:id', checkAuth, updateEmployer);
router.patch('/company/:id', checkAuth, updateCompany);

export default router;
