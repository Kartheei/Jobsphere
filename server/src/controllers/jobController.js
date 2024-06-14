import job from '../models/job.js';
import { errorHandler } from '../middlewares/errorHandler.js';

// Get all jobs
export const getJobs = async (req, res, next) => {
  try {
    const jobs = await job.find();
    res.json(jobs);
  } catch (error) {
    next(error); // errorHandler middleware
  }
};

// Create a new job
export const createJob = async (req, res, next) => {
  const { title, description, company, location, salary, postedBy } = req.body;

  const newJob = new job({
    title,
    description,
    company,
    location,
    salary,
    postedBy,
  });

  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    next(error); // errorHandler middleware
  }
};

export default errorHandler; // Export errorHandler if needed
