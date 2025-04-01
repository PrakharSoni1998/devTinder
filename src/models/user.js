const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(data) {
        if (!validator.isEmail(data)) {
          throw new Error("Invalid email" + data);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      validate(data) {
        if (!validator.isStrongPassword(data)) {
          throw new Error("Please provide strong password" + data);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum:{
        values: ['male', 'female', 'other'],
        message:'{VALUE} is not valid gender type'
      }
      // validate(data) {
      //   if (!["male", "female", "other"].includes(data)) {
      //     throw new Error("Invalid gender");
      //   }
      // },
      // enum: ["male", "female", "other"],
    },
    about: {
      type: String,
      default: "DEFAULT about of user",
    },
    photoURL: {
      type: String,
      default : '',
      validate(data) {
        if (data && !validator.isURL(data)) {
          throw new Error("Invalid photo url" + data);
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.index({skills:1})

userSchema.methods.getJWT = async function(){
  try {
    const user  = this
     const token = await jwt.sign({ _id: user._id }, "dev@TINDER",{expiresIn:'24h'});
     return token
  } catch (error) {
    console.log("err",error);
  }
}

userSchema.methods.validatePassword = async function(password){
  const user  = this
  const passwordHash = user.password
   const isValidPassword = await bcrypt.compare(password, passwordHash);
   return isValidPassword
  }

const User = mongoose.model("User", userSchema);

module.exports = User;
