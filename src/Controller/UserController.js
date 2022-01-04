import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import _ from 'lodash';
import emailValidation from '../Utils/validateEmail.js';
import validatePassword from '../Utils/validatePassword.js';
import Checkout from '../Model/CheckoutModel.js'
import {OAuth2Client} from 'google-auth-library'
import {generateToken} from '../Utils/generateToken.js'; 
import ErrorResponse from '../Utils/ErrorResponse.js';
import SendEmail from '../Utils/SendEmail.js';
import { User } from '../Model/UserModel.js';

dotenv.config()

const UserController = {
    signup: async (req, res, next) => {
        const { firstname, lastname, email, password, confirmPassword } = req.body;

        try{
            if(!firstname || !lastname || !email || !password || !confirmPassword){
                return next 
                    (new ErrorResponse('Please fill all fields', 400))
            }
            if(!emailValidation(email)){
                return next 
                    (new ErrorResponse('Please enter a valid email', 400))
            }
            if(!validatePassword(password)){
                return next 
                    (new ErrorResponse('Please enter a valid password', 400))
            }
            if(password.length < 7){
                return next 
                    (new ErrorResponse('Password must not be less than 8 characters', 400))
            }
            if(password !== confirmPassword){
                return next 
                    (new ErrorResponse('Passwords do not match. Please try again', 400))
            }
            const findUser = await User.findOne({email})

            if(findUser){
                return next 
                    (new ErrorResponse('This user already exist. Please log in', 400))
            }
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(password,  salt);
                const hashPassword = bcrypt.hashSync(confirmPassword, salt)

                if(hashedPassword){
                    const newUser = new User({ 
                                            firstname, 
                                            lastname, 
                                            email, 
                                            password: hashedPassword, 
                                            confirmPassword: hashPassword 
                                        });
                    const savedUser = await newUser.save();
                    await Checkout.create({user: savedUser._id, checkout: []});

                    if (savedUser) {
                    
                        jwt.sign(
                            { id: savedUser._id },
                        process.env.SECRET,
                            {expiresIn: 86000},
                            (err, token) => {
                                if (err) {
                                    throw err
                                }
         
                                res.status(200).json(
                                    { 
                                         status: 'success',
                                         data: {
                                             token: `Bearer ${token}`,
                                             id: savedUser._id,
                                             firstname: savedUser,firstname, 
                                             lastname: savedUser.lastname,
                                             email: savedUser.email,
                                             password: savedUser.password,
                                             confirmPassword: savedUser.confirmPassword,

                                         }, 
                                         message: 'successful'
                                     })
                            }
                        )
                    }
                }
        }
        catch(err){
            console.log(err);
            return res
            .status(500)
            .json({ message: 'Server error'})
        }
    }, 
    
    login: async (req, res) => {
        const { email, password } = req.body;
        
        try {

            if(!email || !password) {
                return next 
                    (new ErrorResponse('All fields must be provided', 400))
            }
           
            const user = await User.findOne({ email })
          
            if(!user) {
                return next 
                    (new ErrorResponse('This user does not exist. Please sign up.', 400))
            }
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return next 
                    (new ErrorResponse('E-mail or password is incorrect', 400))
            }{
                return res.status(200).json({
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    token: 'Bearer ' + generateToken(user)
                })
            }
        } catch (err) {
            console.log(err.message)
        }
    },
    
    googleLogin: async (req, res) => {
        const { tokenId } = req.body;

        const client = new OAuth2Client('755984224582-1c5ofvd65dg1j43b0aq2amnh09e00vit.apps.googleusercontent.com');

        client
        .verifyIdToken({idToken: tokenId, audience: '755984224582-1c5ofvd65dg1j43b0aq2amnh09e00vit.apps.googleusercontent.com'})
        .then(response => {
            const {email_verified, firstname, lastname, email} = response.payload

            if(email_verified){
                User.findOne({email}).exec((err, user) => {
                    if(err){
                        return next 
                            (new ErrorResponse('Oops! Something went wrong...', 400))
                    } else{
                        if(user){
                                return res
                                        .status(200)
                                        .json({
                                            _id: user._id,
                                            firstname: user.firstname,
                                            lastname: user.lastname,
                                            email: user.email,
                                            token: 'Bearer ' + generateToken(user)
                                        })
                        } else{
                            const newUser = new User({ firstname, lastname,  email });
                            const savedUser = newUser.save();

                            if (savedUser) {
                            
                                jwt.sign(
                                    { id: savedUser._id },
                                process.env.SECRET,
                                    {expiresIn: 86000},
                                    (err, token) => {
                                        if (err) {
                                            throw err
                                        }
                 
                                        res.status(200).json(
                                            { 
                                                 status: 'success',
                                                 data: {
                                                    token: `Bearer ${token}`,
                                                    id: savedUser._id,
                                                    firstname: savedUser,firstname, 
                                                    lastname: savedUser.lastname,
                                                    email: savedUser.email,
                                                 }, 
                                                 message: 'successful'
                                             })
                                    }
                                )
                            }
                        }
                    }
                })
            }
        })
    },

    forgetPassword: async (req, res, next) => {
    const { email } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return next
                    (new ErrorResponse("Email could not be sent", 404));
            }

            const resetToken = user.getResetPasswordToken();

            await user.save();

            const resetUrl = `${process.env.CLIENT_URL}/${resetToken}`;

            const message = `
            <h3>You have requested a password reset</h3>
            <p>Please click on this link to reset your password, or you can copy
            and paste in your browser address bar:</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            <p>Regards,</p>
            <p>Lydia Team.</p>
            `;

            try {
                await SendEmail({
                    to: user.email,
                    subject: "Password Reset Request",
                    text: message,
                });

                return res
                        .status(200)
                        .json({ 
                            success: true, data: "Email sent" 
                        });
            } 
            catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next
                (new ErrorResponse("Email could not be sent", 500));
            }
        } catch (error) {
            next(error);
        }
    }, 

    resetPassword: (req, res) => {
        const { newPass, resetLink} = req.body;

        if(resetLink){
            jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY,  (error, decodedData) => {
                if(error){
                    return next
                    (new ErrorResponse("Incorrect token or is expired", 404));
                }
                User.findOne({resetLink}, (err, user) => {
                    if(err || !user){
                        return next
                        (new ErrorResponse("User with this token does not exist", 404));
                    }

                    const obj = {
                        password: newPass, 
                        resetLink: ''
                    }

                    user = _.extend(user, obj);
                    user.save((err, result) => {
                        if(err){
                            return next
                            (new ErrorResponse("Password reset error", 400));
                        } else {
                            return res
                                .status(200)
                                .json({
                                    message: 'Your password has been changed successfully'
                                })
                        }
                    })
                })
            })
        } else {
            return next
            (new ErrorResponse("Authentication error", 404));
        }
    },

    delete: async (req, res) => {
        const { email, password } = req.body;
        const deleteUser = await User.deleteMany({email, password}).exec()

        try{
            if(deleteUser){
                return res
                .status(200)
                .json({message: 'We are sad to see you go'})
            }
            if(!email || !password){
                return next
                (new ErrorResponse("Please fill all fields", 400));
            }
            if(!password){
                return next
                (new ErrorResponse("Password mismatch", 400));
            }
        }
        catch(err){
            console.log(err);
            return next
            (new ErrorResponse("Server error", 500));
        }
    }

}

export default UserController;