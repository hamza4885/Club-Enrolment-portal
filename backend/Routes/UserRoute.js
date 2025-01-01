const express=require("express");
const { registerUser, loginuser, logout, forgotPassword, resetPassword,  updatePassword, updateProfile, getUsers, getSingleUser, updateUserRole, deleteUser, GetUserDetails } = require("../Controllers/userController")
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");
const upload =require("../Middleware/multer");
const { uploadFileToCloudinary } = require("../Middleware/cloudinary");

const router=express.Router();


router.route("/register").post(uploadFileToCloudinary("avatar","userAvatar",false,true),registerUser);

router.route("/login").post(loginuser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/userdetail").get(isAuthenticatedUser,GetUserDetails);

router.route("/password/updatePassword").put(isAuthenticatedUser,updatePassword);

router.route("/updateProfile").put(upload.single('avatar'),isAuthenticatedUser,updateProfile);

router.route("/getUsers").get(getUsers);

router.route("/admin/getuser/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
router.route("/updateUser/:id").put(updateUserRole)
router.route("/admin/deleteUser/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);




module.exports =router;