import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import emailValidation from '../Utils/validateEmail.js';
import validatePassword from '../Utils/validatePassword.js';
import {generateToken} from '../Utils/generateToken.js'; 
import { User } from '../Model/UserModel.js';

dotenv.config()

const AuthController = {
    signup: async (req, res) => {
        const { firstname, lastname, username, email, password} = req.body;

        try{
            if(!firstname || !lastname || !username || !email || !password){
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
            if(!validatePassword(password)){
                return res
                .status(400)
                .json({ message: 'Password must contain alphanumeric characters'});
            }
            if(username === password){
                return res 
                .status(400)
                .json({ message: 'Username and password cannot be a match. Please try a different password'});
            }

                const findUser = await User.findOne({email});
                const findName = await User.findOne({username});

            if(findUser){
                return res
                .status(400)
                .json({ message: 'This user already exist. Please log in'});
            }
            if(findName){
                return res
                .status(400)
                .json({ message: 'This username has been used already. Try a different username'});
            }
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(password, salt);

                if(hashedPassword){
                    const newUser = new User({ firstname, lastname, username, email, password: hashedPassword });
                    const savedUser = await newUser.save();

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
                                             firstname: savedUser.firstname,
                                             lastname: savedUser.lastname,
                                             username: savedUser.username,
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
        const { username, password } = req.body;
        
        try {

            if(!username || !password) {
                return res
                .status(400)
                .json({message: 'All fields must be provided'})
            }
           
            const user = await User.findOne({ username })
          
            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    return res.status(200).json({
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        email: user.email,
                        token: 'Bearer ' + generateToken(user)
                    })
                }
            }
           
            return res
            .status(401)
            .json({message: 'Username and password do not match'})
            
        } catch (err) {
            console.log(err.message)
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