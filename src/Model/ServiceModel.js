import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    }, 
    dateAdded: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
  }
);

let Services = mongoose.model('Service', serviceSchema);

export default Services;
