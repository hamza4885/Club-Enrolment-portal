const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  managerEmail: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  category: {
    type: String,
    required: true,
    enum: ["Sports", "Music", "Technology", "Community Service", "Other"],
  },
  clubemail: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  location: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    default: "",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: []
    },
  ],
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: []
    }
  ],
  packages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      default: []
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Club", clubSchema);