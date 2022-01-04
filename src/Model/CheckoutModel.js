import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  service: [
    {
      serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
      },
      name: {
        type: String,
      },
    },
  ],
  price: {
    type: String,
  },
  status: {
    type: String,
    default: "pending"
  }
});

let Checkout = mongoose.model('Checkout', checkoutSchema);

export default Checkout;