import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    console.log("Connected to database");
  } catch (error) {
    console.error("Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
