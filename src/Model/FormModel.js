import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

let Forms = mongoose.model('Form', formSchema);

export default Forms;
