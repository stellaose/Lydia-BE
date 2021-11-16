import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  item: [
    {
      serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
      },
      name: {
        type: String,
      },
      price: {
        type: String,
      },
    },
  ],
});

let Checkout = mongoose.model('Checkout', checkoutSchema);

export default Checkout;