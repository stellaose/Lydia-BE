import { Router } from 'express';
import ReviewController from '../Controller/ReviewController.js';
import Auth from '../Middleware/Auth.js';

const router = Router();

router.post('/:serviceId', ReviewController.postReview);
router.delete('/:serviceId', Auth, ReviewController.deleteReviews);

//for each review id
// router.get('/:serviceId/:reviewId', Auth, ReviewController.getReview);
router.get('/:serviceId/:reviewId', Auth, ReviewController.getReview);
router.delete('/:serviceId/:reviewId', Auth, ReviewController.deleteReview);

export default router;