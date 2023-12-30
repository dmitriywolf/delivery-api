import express from 'express';
import {
  getAllEmployers,
  getEmployerById,
  updateEmployerById,
} from '#root/controllers/employer.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', getAllEmployers);
router.get('/:id', getEmployerById);
router.patch('/:id', checkAuth, updateEmployerById);

export default router;
