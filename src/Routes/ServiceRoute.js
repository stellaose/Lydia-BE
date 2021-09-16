import { Router } from 'express';
import ServiceController from '../Controller/ServiceController.js';
import Auth from '../Middleware/Auth.js';

const router = Router();

router.get('/service/list', ServiceController.getServices);
router.get('/service/query', ServiceController.getServicesByQuery);
router.post('/service/list', ServiceController.postServices);

router.get('/service/:serviceId', ServiceController.getService);
router.patch('/service/:serviceId', Auth, ServiceController.updateServices);
router.delete('/service/:serviceId', Auth, ServiceController.deleteServices);

export default router;