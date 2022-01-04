import { Router } from 'express';
import UserController from '../Controller/UserController.js';

const router = Router();

router.post('/register', UserController.signup);
router.post('/login', UserController.login);
router.delete('/delete', UserController.delete);
router.post('/google', UserController.googleLogin);
router.put('/forget-password', UserController.forgetPassword);
router.put('/reset-password', UserController.resetPassword);
// router.patch('/reset-password', UserController.resetPassword);



export default router;