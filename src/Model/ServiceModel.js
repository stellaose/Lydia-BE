import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    content1: {
      type: String,
      required: true,
    },
    content2: {
      type: String,
      required: true,
    }, 
    content3: {
      type: String,
      required: true,
    },
    content4: {
      type: String,
      required: true,
    },
    content5: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

let Services = mongoose.model('Service', serviceSchema);

export default Services;
