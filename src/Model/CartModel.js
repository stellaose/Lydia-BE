import mongoose from 'mongoose';

const { Schema, model} = mongoose;

const cartSchema = new Schema (
    {
        userId: {
            type: Schema.ObjectId(),
            ref: 'user',
            required: true
        },
        items: [
            {
                serviceId: {
                    type: Schema.ObjectId(),
                    ref: 'service',
                },
                name: {
                    type: String,
                },
                price: {
                    type: Number
                }
            }
        ],
        bill: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

let Cart = mongoose.model('Cart', cartSchema);

export default Cart;