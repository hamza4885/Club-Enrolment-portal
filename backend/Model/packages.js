const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club", 
        required: true,
    },
}, { timestamps: true });

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
