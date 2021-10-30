import Reviews from '../Model/ReviewModel.js';

const ReviewController = {

  postReview: async (req, res) => {
    try {
      const review = req.body;
      const { author, title, comment } = review
      const { serviceId } = req.params;

      if (!serviceId) {
        return res
              .status(400)
              .json({ message: `No serviceId present for this review` })
              .end();
      }
     if(!author || !title ||! comment){
        return res
                .status(400)
                .json({message: 'Please fill all fields'})
                .end();
      }
    
      // if(!review){
      //   return res
      //           .status(400)
      //           .json({message: 'Please fill all fields'})
      //           .end();
      // }
      
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
        return res
              .status(400)
              .json({ message: `Could not create review` })
              .end();
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
      return res
              .status(400)
              .json({ message: 'invalid request'})
              .end()
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
                .json({ getOneReview,
                      message: 'Successful' })
                .end();
      } else {
        return res
          .status(404)
          .send({ message: `there are no reviews with this service id` })
          .end();
      }
    }
    catch (err){
      return res
          .status(400)
          .json({message: 'Something went wrong'})

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
        return res
          .status(404)
          .json({ message: `there are no reviews with this id` })
          .end();
      }
    } catch (err) {
        return res
          .status(400)
          .json({ message: `Invalid review id` })
          .end();
    }
  },

  deleteReviews: async (req, res) => {
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
        res
          .status(404)
          .json({ message: `There are no reviews for this service id` })
          .end();
      }
    } catch (err) {
      res
        .status(400)
        .json({ message: `Invalid dish id` })
        .end();
    }
  
  }
}

export default ReviewController;
 