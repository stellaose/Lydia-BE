import Reviews from '../Model/ReviewModel.js';

const ReviewController = {
    getReviews: async (req, res) => {
        try {
            const reviews = await Reviews.find().exec();
            return res
            .status(200)
            .json({ reviews })
            .end()
        }
        catch(err){
            console.log(err);
            res
            .status(400)
            .json({message: 'Invalid request'})
            .end()
        }
    },

    postReviews: async ( req, res) => {
        try{
            const review = req.body;
            const { serviceId } = req.params;

            if(!serviceId){
                return res
                .status(400)
                .json({message: 'No serviceId present for this review'})
                .end()
            }
            if(req.rating && isNan(review.rating)){
                return res
                .status(400)
                .json({message: 'Rating in invalid'})
                .end()
            }

            const addReviews = await Reviews.create({...review, serviceId})
            if(addReviews){
                return res
                .status(400)
                .json({message: 'Review successfully added',
                        data: addReviews})
            } else{
                return res
                .status(400)
                .json({message: 'Review could not be created. Please try again'})
            }
        }
        catch(err){
            res
            .status(400)
            .json({ message: 'Invalid service Id'})
            .end()
        }
    },

    deleteReviews: async(req, res) => {
        try{
            const { serviceId } = req.params;
            const deleteAll = await Reviews.deleteMany({ serviceId }).exec(); 

            if (deleteAll.n > 0) {
              return res
              .status(200)
              .send({ message: `Successfully deleted all reviews`})
              .end()
            } 
            else {
              res.status(404)
                 .send({ message: `There are no reviews available`})
                 .end()
            }
        }
        catch(err){
            console.log(err);
            return res
            .status(400)
            .json({message: 'Oops! an error occurred. Please try again'})
        }
    },

    deleteReview: async (req, res) => {
        try{
            const { reviewId } = req.params;
            const deleteOne = await Reviews.findByIdAndDelete({ _id: reviewId }).exec();
   
            if (deleteOne !== null) {
            return res
            .status(200)
            .send({ message: `deleted review with the id: ${reviewId}` })
            .end();
            } 
            else {
            res
                .status(404)
                .send({ message: `there are no reviews with this id` })
                .end();
        }
    }   
        catch(err){
            console.log(err);
            return res
            .status(400)
            .json({message: 'There are no reviews with this id'})
        }
    }
}

export default ReviewController;