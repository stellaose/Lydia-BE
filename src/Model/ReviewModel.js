import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    author: {
      type: String,
      default: "No Name"
    },
    title: {
      type: String,
      default: "No Title"
    },
    comment: {
      type: String,
    }, 
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

let Reviews = mongoose.model('Review', reviewSchema);

export default Reviews;
