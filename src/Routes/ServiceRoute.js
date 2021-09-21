import { Router } from 'express';
import ServiceController from '../Controller/ServiceController.js';
import Auth from '../Middleware/Auth.js';

const router = Router();

router.get('/list', ServiceController.getServices);
router.get('/query', ServiceController.getServicesByQuery);
router.post('/service/list', ServiceController.postServices);

router.get('/:serviceId', ServiceController.getService);
router.patch('/:serviceId', Auth, ServiceController.updateServices);
router.delete('/:serviceId', Auth, ServiceController.deleteServices);

export default router;