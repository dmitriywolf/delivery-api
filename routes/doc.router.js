import express from 'express';
import { getMyDocs, createDoc, editDoc, removeDoc } from '#root/controllers/doc.controller.js';
import { checkAuth, checkIsEmployer } from '#root/middleware/index.js';

const router = express.Router();

router.get('/', checkAuth, getMyDocs);
router.post('/', checkAuth, checkIsEmployer, createDoc);
router.patch('/:id', checkAuth, editDoc);
router.delete('/:id', checkAuth, removeDoc);

export default router;
