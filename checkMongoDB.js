require("dotenv").config();
const mongoose = require("mongoose");
const connectDb = require("./config/dbConnection");

const connect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.log("❌ Failed to connect", err);
  }
};

connectDb();
