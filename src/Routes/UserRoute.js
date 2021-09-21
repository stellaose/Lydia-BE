import { Router } from 'express';
import AuthController from '../Controller/AuthController.js';

const router = Router();

router.post('/api/register', AuthController.signup);
router.post('api/login', AuthController.login);
router.post('/api/delete', AuthController.delete);

export default router;