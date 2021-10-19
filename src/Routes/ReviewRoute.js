import { Router } from 'express';
import ReviewController from '../Controller/ReviewController.js';
import Auth from '../Middleware/Auth.js';

const router = Router();

router.post('/:serviceId/review', ReviewController.postReview);
router.delete('/:serviceId/review', Auth, ReviewController.deleteReviews);

//for each review id
router.get('/:serviceId/review/:reviewId', Auth, ReviewController.getReview);
router.delete('/:serviceId/review/:reviewId', Auth, ReviewController.deleteReview);

export default router;