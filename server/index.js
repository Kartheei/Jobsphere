import express from 'express';
import dotenv from 'dotenv';

// Import Routes
import connectDB from './src/config/db.js';
import jobRoutes from './src/routes/jobRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

// Custom middleware
import { errorHandler } from './src/middlewares/errorHandler.js';

dotenv.config();

const app = express();

// Define Port number 
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Create and start an Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
