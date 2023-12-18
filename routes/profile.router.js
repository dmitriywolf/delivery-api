import express from 'express';
import { getMe, updateSeeker, updateEmployer } from '#root/controllers/profile.controller.js';
import { checkAuth, handleValidationErrors } from '#root/middleware/index.js';
import { updateSeekerValidation } from '#root/validation/index.js';

const router = express.Router();

router.get('/', checkAuth, getMe);
router.patch(
  '/seeker/:id',
  checkAuth,
  updateSeekerValidation,
  handleValidationErrors,
  updateSeeker,
);
router.patch('/employer/:id', checkAuth, updateEmployer);

export default router;
