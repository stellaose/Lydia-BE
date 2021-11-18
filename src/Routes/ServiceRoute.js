import { Router } from 'express';
import ServiceController from '../Controller/ServiceController.js';
import Auth from '../Middleware/Auth.js';

const router = Router();

router.route('/list').get( ServiceController.getServices)
                     .post(ServiceController.postService);
router.get('/query', ServiceController.getServicesByQuery);


router.route('/:serviceId').get(ServiceController.getService)
                            .patch(Auth, ServiceController.updateService)
                            .delete(Auth, ServiceController.deleteServices);

export default router;