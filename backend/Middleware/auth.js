const ErrorHandler = require("../Utiles/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const Jwt = require("jsonwebtoken");
const User = require("../Model/user");

exports.isAuthenticatedUser = (role) =>
  // catchAsyncErrors(
    async (req, res, next) => {
    //it gets the id of the user
    const { token } = req.cookies; //we have dowloaded the cookie-parcer to get the token
    console.log("Token: ",token)
    if (!token) {
      return next(
        new ErrorHandler("PLease login to access this resource", 401)
      );
    }

    const decodedata = Jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedata.id);
    next();
  }
// );

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      //include checks if the given role found in the user if it is equal then it return true
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};