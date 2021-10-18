import { Router } from 'express';
import ReviewController from '../Controller/ReviewController.js';
import Auth from '../Middleware/Auth.js';

const router = Router();

router.post('/:serviceId/reviews', ReviewController.postReview);
router.delete('/:serviceId/reviews', Auth, ReviewController.deleteReviews);

//for each review id
router.get('/:serviceId/reviews/:reviewId', Auth, ReviewController.getReview);
router.delete('/:serviceId/reviews/:reviewId', Auth, ReviewController.deleteReview);

export default router;