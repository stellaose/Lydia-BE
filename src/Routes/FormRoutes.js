import { Router } from 'express';
import FormController from '../Controller/FormController.js';

const router = Router();

router.post('/signup', FormController.signup);

export default router;