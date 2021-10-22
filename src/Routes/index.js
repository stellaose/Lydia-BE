import express from 'express';

import ServiceRoute from './ServiceRoute.js';
import ReviewRoute from './ReviewRoute.js';

const router = express.Router();

router.use('/service', ServiceRoute);
router.use('/service', ReviewRoute);

export default router;