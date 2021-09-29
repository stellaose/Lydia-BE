import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, model} = mongoose;
const { isEmail } = validator;

const userSchema = new Schema (
    {
        firstname: {
            type: String,
            required: true
        },
        lastname : {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            validate: [ isEmail, 'Please enter a valid email']
        },
        password: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

export const User = model('user', userSchema);