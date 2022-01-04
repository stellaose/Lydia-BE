import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const { Schema, model} = mongoose;
const {isEmail} = validator

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
            lowercase: true,
            required: true,
            validate: [ isEmail, 'Please enter a valid email']
        },
        password: {
            type: String,
            required: true
        },
        confirmPassword: {
            type: String,
            // required: true
        }
    },
    {timestamps: true}
)

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//       next();
//     }
  
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });
  
//   userSchema.methods.matchPasswords = async function (password) {
//     return await bcrypt.compare(password, this.password);
//   };
  
//   userSchema.methods.getSignedToken = function () {
//     return jwt.sign({ id: this._id }, process.env.SECRET, {
//       expiresIn: process.env.JWT_EXPIRE,
//     });
//   };

  userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  
    return resetToken;
  };

export const User = model('user', userSchema);