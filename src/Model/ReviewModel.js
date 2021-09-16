import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
    {
        author: {
            type: String,
            default: "No Name"
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        title: {
            type: String,
            default: "No Title"
        },
        comment: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

let Reviews = mongoose.model('Review', reviewSchema);

export default Reviews;