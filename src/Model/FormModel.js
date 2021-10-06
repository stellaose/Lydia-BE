import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    preference: {
      type: String,
      required: true,
    },
    knowledge: {
        type: String,
      required: true,
    },
    room: {
        type: String,
      required: true,
    },
    date: {
      type: Date, 
      default: Date.now,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

let Forms = mongoose.model('Form', formSchema);

export default Forms;
