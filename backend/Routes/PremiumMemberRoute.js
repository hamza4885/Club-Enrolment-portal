const express = require("express");
const mongoose = require("mongoose");
const PremiumMember = require("../Model/premiumMembers");

const router = express.Router();

// ✅ Get all premium members
router.get("/getPremiumMember", async (req, res) => {
  try {
    const premiumMembers = await PremiumMember.find();
    res.status(200).json({ success: true, premiumMembers });
  } catch (error) {
    console.error("Error fetching premium members:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Add a new premium member
router.post("/premiumMembers", async (req, res) => {
  try {
    const { userId, name, email, package, amount } = req.body;

    const newMember = new PremiumMember({ userId, name, email, package, amount });
    await newMember.save();

    res.status(201).json({ success: true, message: "User added to Premium Members List" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Delete a premium member
router.delete("/removePremiummember/:memberId", async (req, res) => {
  try {
    const { memberId } = req.params;


 if (!mongoose.Types.ObjectId.isValid(memberId)) {
  return res.status(400).json({ success: false, message: "Invalid member ID format" });
}
    const member = await PremiumMember.findById(memberId);
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    await PremiumMember.findByIdAndDelete(memberId);
    res.status(200).json({ success: true, message: "Member removed successfully" });
  } catch (error) {
    console.error("Error deleting premium member:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
