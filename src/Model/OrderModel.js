import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
    amount: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        default: "pending" 
    },
});

let Order = mongoose.model('Order', orderSchema);

export default Order;