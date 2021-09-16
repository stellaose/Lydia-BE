import jwt from 'jsonwebtoken';


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
        expiresIn: 3600
    }
    )
}