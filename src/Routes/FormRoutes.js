import { Router } from 'express';
import FormController from '../Controller/FormController.js';

const router = Router();

router.post('/create', FormController.createForm);

export default router;