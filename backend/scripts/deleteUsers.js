import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { User } from "../src/models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/student-expense-tracker";

const run = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected:", uri);

    const before = await User.countDocuments();
    console.log("Users before deleteMany:", before);

    const res = await User.deleteMany({});
    console.log("Deleted count:", res.deletedCount);

    const after = await User.countDocuments();
    console.log("Users after deleteMany:", after);
  } catch (err) {
    console.error("Error deleting users:", err.message);
  } finally {
    await mongoose.disconnect();
  }
};

run();
