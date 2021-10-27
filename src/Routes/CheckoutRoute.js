import { Router } from 'express';

import CheckoutController from '../Controller/CheckoutController.js';
import Auth from '../Middleware/Auth.js';

let router = Router();

router.get('/list', CheckoutController.getServices)

router.get("/:userId", CheckoutController.getService);
router.post("/:serviceId", Auth, CheckoutController.postService);

//Cart IDs
router.delete("/:serviceId", Auth, CheckoutController.deleteService);

export default router;