import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to database");
    return;
  }

  console.log("Connected to database");
  return await mongoose.connect(process.env.MONGO_URI);
}
