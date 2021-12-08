import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Mailgun from 'mailgun.js'
import formData from 'form-data';
import emailValidation from '../Utils/validateEmail.js';
import Checkout from '../Model/CheckoutModel.js'
import {OAuth2Client} from 'google-auth-library'
import {generateToken} from '../Utils/generateToken.js'; 
import { User } from '../Model/UserModel.js';

dotenv.config()

const DOMAIN = "sandbox4de08e94d41049b1ba6aa781219dc957.mailgun.org";
const mailgun = new Mailgun(formData);
const mg = mailgun.client({domain: DOMAIN, username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});

const AuthController = {
    signup: async (req, res) => {
        const { firstname, lastname, email, password, confirmPassword } = req.body;

        try{
            if(!firstname || !lastname || !email || !password || !confirmPassword){
                return res
                .status(400)
                .json({ message: 'Please fill all fields' });
            }
            if(!emailValidation(email)){
                return res
                .status(400)
                .json({ message: 'Please enter a valid email' });
            }
            if(password.length < 8){
                return res 
                .status(400)
                .json({ message: 'Password must not be less than 8 characters'});
            }
            if(password !== confirmPassword){
                return res
                    .status(400)
                    .json({
                        message: 'Passwords do not match. Please try again'
                    })
            }
            const findUser = await User.findOne({email})

            if(findUser){
                return res
                .status(400)
                .json({ message: 'This user already exist. Please log in'});
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
                return res
                .status(400)
                .json({message: 'All fields must be provided'})
            }
           
            const user = await User.findOne({ email })
          
            if(user) {
               return res
                    .status(400)
                    .json({
                        message: 'This user already exist. Please login.'
                    })
            }
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
              return res
                .status(400)
                .json({ status: 'fail', message: 'email or password is incorrect' });
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
                        return res
                        .status(400)
                        .json({message: 'Something went wrong...'})
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

    forgetPassword: async (req, res) => {
        const { email } = req.body;

        User.findOne({email}, (err, user) => {

            if(!user || err){
                return res 
                    .status(400)
                    .json({
                        status: 'failed',
                        message: 'User with this email does not exist'
                    })
            }

            const token = jwt.sign({_id: user._id}, process.env.FORGET_PASSWORD, {expiresIn: '20m'})
            const data = {
                from: 'noreply@hello.com',
                to: email,
                subject: 'Account Activation Link',
                html: `
                    <h2>Please click on the link to reset your password</h2>
                    <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
                `
            }
            return user.updateOne({resetLink: token}, (err, success) =>{
                if(err){
                    return res
                            .status(400)
                            .json({
                                status: 'failed',
                                message: 'Reset password link error'
                            })
                } else {
                    mg.messages.create(DOMAIN, data)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                }
            })
        })

       
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
                return res
                .status(400)
                .json({message: 'Please fill all fields'})
            }
            if(!password){
                return res
                .status(400)
                .json({message: 'Username and password do not match. Please try again'})
            }
        }
        catch(err){
            console.log(err);
            return res
            .status(400)
            .json({ message: 'Server error'})
        }
    }

}

export default AuthController;