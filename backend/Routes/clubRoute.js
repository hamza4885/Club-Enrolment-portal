const express = require("express");
const {
  registerClub,
  getAllClubs,
  getClubById,
  deleteClub,
  updateClub,
  registerUserInClub,
  getUserClubs,
  getClubMembers,
  removeClubMember,
  checkUserRegistration,
} = require("../Controllers/clubController");
const upload =require("../Middleware/multer");
const { uploadFileToCloudinary } = require("../Middleware/cloudinary");

const router = express.Router();

router.post(
  "/registerclub",
  uploadFileToCloudinary("images", "clubs", true, false),
  registerClub
);
router.get('/checkUserRegistration/:clubId/:userId', checkUserRegistration);

router.get("/getClubs", getAllClubs);
router.get("/getClub/adminPanel", getAllClubs);
router.get("/getClubMembers/:clubId", getClubMembers);
router.delete("/removeClubMember/:clubId", removeClubMember);
router.get("/getuserClubs/:userId", getUserClubs);
router.route("/RegisterinClub/:clubId").post(registerUserInClub);
router.get("/getClub/:id", getClubById);
router.delete("/deleteClub/:id", deleteClub);
router.put("/updateClub/:id", updateClub);

module.exports = router;
