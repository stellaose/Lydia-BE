import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  checkout: [
    {
        service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
       
      },
    },
  ],
});

let Checkout = mongoose.model('Checkout', checkoutSchema);

export default Checkout;