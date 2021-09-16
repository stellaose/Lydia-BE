import { Router } from 'express';
import AuthController from '../Controller/AuthController.js';

const router = Router();

router.post('/api/register', AuthController.signup);

export default router;