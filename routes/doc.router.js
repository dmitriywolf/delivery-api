import express from 'express';
import { getMyDocs, createDoc, editDoc, removeDoc } from '#root/controllers/doc.controller.js';
import { checkAuth } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', checkAuth, getMyDocs);
router.post('/', checkAuth, createDoc);
router.patch('/:docId', checkAuth, editDoc);
router.delete('/:docId', checkAuth, removeDoc);

export default router;
