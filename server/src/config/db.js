import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errorHandler } from '../middlewares/errorHandler.js';
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Pass the error to the errorHandler middleware
    errorHandler(error);
    process.exit(1);
  }
};

export default connectDB;
