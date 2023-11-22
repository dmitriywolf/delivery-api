import express from 'express';
import {
  getLastTags,
  getAll,
  getOne,
  create,
  remove,
  // update,
} from '#root/controllers/postController.js';
import { postCreateValidation } from '#root/validation/index.js';
import { handleValidationErrors, checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', getAll);
router.get('/tags', getLastTags);
router.get('/:id', getOne);
router.post('/', checkAuth, postCreateValidation, handleValidationErrors, create);
router.delete('/:id', checkAuth, remove);
// router.patch('/:id', checkAuth, postCreateValidation, handleValidationErrors, update);

export default router;
