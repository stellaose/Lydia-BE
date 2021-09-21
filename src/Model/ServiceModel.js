import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0,
          },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

let Services = mongoose.model('Services', serviceSchema);

export default Services;