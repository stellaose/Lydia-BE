import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const checkoutSchema = new Schema (
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required:true,
        },
        services: [
            {
                serviceId: {
                    type: Schema.Types.ObjectId,
                    ref: 'service',
                    required: true,
                },
            }
        ], 
    },
    {timestamps: true}
);

let Checkout = mongoose.model('Checkout', checkoutSchema);

export default Checkout;