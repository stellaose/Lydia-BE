import { Router } from 'express';
import FormController from '../Controller/FormController.js';

const router = Router();

router.post('/create', FormController.createForm);
router.get('/:formId', FormController.getOneForm);
router.get('/list', FormController.getForms);

export default router;