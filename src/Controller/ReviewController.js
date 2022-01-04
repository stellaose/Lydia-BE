import Reviews from '../Model/ReviewModel.js';
import ErrorResponse from '../Utils/ErrorResponse.js'

const ReviewController = {

  postReview: async (req, res, next) => {
    try {
      const review = req.body;
      const { author, title, comment } = review
      const { serviceId } = req.params;

      if (!serviceId) {
        return next
            (new ErrorResponse("No serviceId present for this review", 400))
      }
     if(!author || !title ||!comment){
        return next 
            (new ErrorResponse("Please fill all fields", 400))
      }
          
      const addReview = await Reviews.create({ ...review, serviceId });

      if (addReview) {
        return res
              .status(200)
              .json({
                  message: 'success',
                  data: addReview,
                })
              .end();
      } 
      else {
        return next
            (new ErrorResponse("Could not create review", 400))
      }
    } catch (err) {
      console.log(err);
    }
  },
 
  getReviews: async (req, res) => {
    try {
      const reviews = await Reviews.find()
                                    .exec()
      
      return res
              .status(200)
              .json({ reviews })
              .end()
    }
    catch (err){
      console.log(err)
      return next
        (new ErrorResponse("Invalid request", 400))
    }
  }, 

  getReview : async (req, res) => {
    try{
      const { reviewId } = req.params;
      const getOneReview = await Reviews
                                .findById({ _id: reviewId })
                                .populate()
                                .lean()
                                .exec();
  
      if (getOneReview !== null) {
        return res
                .status(200)
                .json({ data:{
                  getOneReview
                },
                   })
                .end();
      } else {
        return next
            (new ErrorResponse("there are no reviews with this service id", 400))
      }
    }
    catch (err){
      return next
          (new ErrorResponse("Something went wrong", 400))

    }
  }, 

  deleteReview : async (req, res) => {
    try {
      const { reviewId } = req.params;
  
      const deleteOne = await Reviews
                                  .findByIdAndDelete({ _id: reviewId })
                                  .exec();
  
      if (deleteOne !== null) {
        return res
          .status(200)
          .json({ message: `deleted review with the id: ${reviewId}` })
          .end();
      } 
      else {
        return next
            (new ErrorResponse("there are no reviews with this id", 400))
      }
    } catch (err) {
        return next
          (new ErrorResponse("Invalid reviewId", 400))
    }
  },

  deleteReviews: async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      const deleteAll = await Reviews
                                  .deleteMany({ serviceId })
                                  .exec();

      if (deleteAll.n > 0) {
        res
          .status(200)
          .json({ message: `deleted reviews for ${serviceId}` })
          .end();
      } else {
        return next
            (new ErrorResponse ("There are no reviews for this service id", 404))
      }
    } catch (err) {
      return next
          (new ErrorResponse("invalid ServiceId", 400))
    }
  
  }
}

export default ReviewController;
 