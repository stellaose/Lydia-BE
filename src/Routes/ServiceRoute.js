import { Router } from 'express';
import ServiceController from '../Controller/ServiceController.js';
import Auth from '../Middleware/Auth.js';

const router = Router();

router.get('/list', ServiceController.getServices);
router.get('/query', ServiceController.getServicesByQuery);
router.post('/list', ServiceController.postService);

//for the ids
router.get('/:serviceId', ServiceController.getService)
router.patch('/:serviceId', Auth, ServiceController.updateService);
router.delete('/:serviceId', Auth, ServiceController.deleteServices);

export default router;