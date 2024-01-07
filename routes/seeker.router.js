import express from 'express';
import {
  // getAllSeekers,
  // getSeekerById,
  updateSeekerById,
} from '#root/controllers/seeker.controller.js';

const router = express.Router();

// router.get('/', getAllSeekers);
// router.get('/:id', getSeekerById);
router.patch('/:id', updateSeekerById);

export default router;
