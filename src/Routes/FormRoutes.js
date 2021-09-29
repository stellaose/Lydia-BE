import { Router } from 'express';
import FormController from '../Controller/FormController.js';

const router = Router();

router.post('/list', FormController.signup);

export default router;