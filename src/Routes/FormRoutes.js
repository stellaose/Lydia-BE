import { Router } from 'express';
import FormController from '../Controller/FormController.js';

const router = Router();

router.post('/create', FormController.createForm);
router.get('/list', FormController.getForm);

export default router;