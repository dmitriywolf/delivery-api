import express from 'express';
import {
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
} from '#root/controllers/company.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.patch('/:id', checkAuth, updateCompanyById);

export default router;
