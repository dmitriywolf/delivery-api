import express from 'express';
import {
  getMyDocs,
  createDoc,
  editDoc,
  removeDoc,
  getDocsByCompanyId,
} from '#root/controllers/doc.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', checkAuth, getMyDocs);
router.get('/:companyId', getDocsByCompanyId);
router.post('/', checkAuth, createDoc);
router.patch('/:docId', checkAuth, editDoc);
router.delete('/:docId', checkAuth, removeDoc);

export default router;
