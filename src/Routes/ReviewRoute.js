import { Router } from 'express';
import ReviewController from '../controller/ReviewController.js';
import Auth from '../Middleware/Auth.js';

const router = Router();

router.post('/:serviceId/reviews', ReviewController.postReviews);
router.delete('/:serviceId/reviews', Auth, ReviewController.deleteReviews);
router.get('/reviews', ReviewController.getReviews);

router.delete('/serviceId/review/:reviewId', Auth, ReviewController.deleteReview);

export default router;