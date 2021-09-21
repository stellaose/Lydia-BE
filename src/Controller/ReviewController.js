import Reviews from '../Model/ReviewModel.js';

const ReviewController = {
    getReviews: async (req, res) => {
        try {
            let reviews = await Reviews
                            .find()
                            .exec();
            return res
            .status(200)
            .json({ reviews })
            .end();
          } catch (err) {
            console.log(err);
            return res
            .status(400)
            .send({ message: `Invalid request` })
            .end();
          }
    },

    getReview: async (req, res) => {
        try {
          const { serviceId } = req.params;
          const getOneReview = await Reviews
                                        .findById({ _id: serviceId })
                                        .exec();

        
          if (getOneReview) {
            return res
                    .status(200)
                    .json({message: 'Successful', data: getOneReview })
                    .end();
          } else {
             return res
               .status(404)
               .send({ message: 'there are no reviews with this service id '})
               .end();
        }
        } catch (err) {
          return res
            .status(400)
            .send({ message: 'Invalid service id' })
            .end();
        }
    },
      

    postReviews: async ( req, res) => {
        try {
            const review = req.body;
            const { serviceId } = req.params;

            if (!serviceId) {
              return res
              .status(400)
              .json({ message: `No serviceId present for this review`})
              .end()
            }
            if (review.rating && isNaN(review.rating)) {
              res.status(400)
                    .send({ message: `Rating is invalid`})
                    .end()
              return
            }
            const addReview = await Reviews.create({...review, serviceId });
            if (addReview) {
              res.status(200)
              .send({  
                        status: "success",
                        data: addReview
                    })
            } 
            else {
              return res
                .status(400)   
                .send({ message: `Could not create review`})
                .end()
            }
          } catch (err) {
            console.log(err)
          } 
    },

    deleteReview: async (req, res) => {
        try {
           const { reviewId } = req.params;
          
          const deleteOne = await Reviews
                            .findByIdAndDelete({ _id: reviewId })  
                            .exec();
         
          if (deleteOne !== null) {
           res
             .status(200)
             .send({ message: `deleted review with the id: ${reviewId}` })
             .end();
          } else {
            res
            .status(404)
            .send({ message: `there are no reviews with this id` })
            .end();
        return;
        }
        
        } catch (err) {
          return res
                .status(400)
                .send({ message: `Invalid review id` })
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
            return res
                .status(200)
                .send({ message: `deleted reviews for ${serviceId}`})
                .end()
          }
          else {
            return res
                    .status(404)   
                    .send({ message: `There are no reviews for this service id`})
                    .end()
          }       
        } catch (err) {
          return res
                .status(400)
                .send({ message: `Invalid service id`})
                .end()
        }
    }
}

export default ReviewController;