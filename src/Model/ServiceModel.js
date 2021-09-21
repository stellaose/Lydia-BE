import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    content: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

let Services = mongoose.model('Service', serviceSchema);

export default Services;
