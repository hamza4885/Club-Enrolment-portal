const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./Config/config.env" });

const connectToMongo = async () => {

  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ClubManagementSystem");
  console.log("Connected to the database");
};

module.exports = connectToMongo;
