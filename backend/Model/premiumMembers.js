const mongoose = require("mongoose");

const premiumMemberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  package: { type: String, required: true }, 
  amount: { type: Number, required: true },
  subscribedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PremiumMember", premiumMemberSchema);
