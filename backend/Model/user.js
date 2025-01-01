const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require("bcryptjs")
const Jwt=require("jsonwebtoken")
const crypto=require("crypto")

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [false, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,    //If admin gets all the user the password is not visible to admin 
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  });

  userSchema.pre("save", async function(next) {   //userSchema.pre("save", ...) registers a middleware function to run before the document is saved
    if (!this.isModified("password")) { // if password is not modified
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  
  // JWT Token
  userSchema.methods.getJWTToken=function(){
    return Jwt.sign({id:this._id},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRE
    })
  }

  
  userSchema.methods.getResetPasswordToken = function() {
  // Generate a token using crypto
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash the token and set it to `resetPasswordToken` field in the user schema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Set the token expiry time to 15 minutes from now
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  // Return the plain reset token
  return resetToken;
};

  // Export the model
module.exports = mongoose.model('User', userSchema);