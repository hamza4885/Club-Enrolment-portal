const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club", 
      required: true
    },
    eventTitle: {
      type: String,
      required: true,
      trim: true
    },
    eventDescription: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: false,
      trim: true
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming"
    }
  },
  { timestamps: true } 
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
