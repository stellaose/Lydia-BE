import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
    },
    process.env.SECRET,
    {
        expiresIn: 86000
    }
    )
}