import { Router } from 'express';
import AuthController from '../Controller/AuthController.js';

const router = Router();

router.post('/register', AuthController.signup);
router.post('/login', AuthController.login);
router.delete('/delete', AuthController.delete);
router.post('/google', AuthController.googleLogin);

export default router;