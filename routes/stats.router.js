import express from 'express';
import {
  getTotalStat,
  getLevelStat,
  getEmploymentStat,
  getNotConsiderDomainsStat,
  getEnglishStat,
  getSalaryExpectationStat,
} from '#root/controllers/stats.controller.js';

const router = express.Router();

router.get('/total', getTotalStat);
router.get('/levels', getLevelStat);
router.get('/employment', getEmploymentStat);
router.get('/not-consider-domains', getNotConsiderDomainsStat);
router.get('/english', getEnglishStat);
router.get('/salary-expectation', getSalaryExpectationStat);

export default router;
