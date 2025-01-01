const ErrorHandler=require("../utiles/Errorhandler");

const errorMiddleware=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "internal server error"

  // Wrong Mondodb ID error -- If i add the wrong id it will give me this short error message
    if(err.name =="CastError"){
        const message=`Resource not Found. Invalid : ${err.path}`
        err=new ErrorHandler(message,400);
    }
    
    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    
    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again `;
        err = new ErrorHandler(message, 400);
    }
    
    // JWT EXPIRE error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again `;
        err = new ErrorHandler(message, 400);
    }
    console.log(err.stack);
    res.status(err.statusCode).json({
        success:false,
        error:err.message,
    })
}

module.exports=errorMiddleware;