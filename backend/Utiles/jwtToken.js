// // Create Token and saving in cookie
// const sendToken = (user, statusCode, res) => {
//     const token = user.getJWTToken();
  
//     // Options for cookie
//     const options = {
//       expires: new Date(
//         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true,
//       sameSite: "None",
//     };
  
//     res.status(statusCode).cookie("token", token).json({
//       success: true,
//       token
//     });
// };
  
// module.exports = sendToken;


// Create Token and save it in a cookie
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();  

    res.status(statusCode).json({
        success: true,
        token, // Send the token in response
        user,  // Send user data as well
    });
};

module.exports = sendToken;

  