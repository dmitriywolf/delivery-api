import express from 'express';
import {
  getTotalStat,
  getLevelStat,
  getEmploymentStat,
  getNotConsiderDomainsStat,
} from '#root/controllers/stats.controller.js';

const router = express.Router();

router.get('/total', getTotalStat);
router.get('/levels', getLevelStat);
router.get('/employment', getEmploymentStat);
router.get('/not-consider-domains', getNotConsiderDomainsStat);

export default router;
