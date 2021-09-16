import { Router } from 'express';
import ReviewController from '../controller/ReviewController.js';
import Auth from '../Middleware/Auth.js';

const router = Router();

router.post('/service/:serviceId/reviews', ReviewController.postReviews);
router.delete('/service/:serviceId/reviews', Auth, ReviewController.deleteReviews);
router.get('/service/reviews', ReviewController.getReviews);

router.delete('/service/serviceId/review/:reviewId', Auth, ReviewController.deleteReview);

export default router;