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

// /Update Job details
export const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, company, location, salary } = req.body;

  try {
    const updatedJob = await job.findByIdAndUpdate(
      id,
      {
        title,
        description,
        company,
        location,
        salary,
        updatedAt: new Date().toISOString() 
      },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(updatedJob);
  } catch (error) {
    next(error); 
  }
};


// Get job list
export const getJobList = async (req, res, next) => {
  try {
    // Ensure the user is authenticated and has a userId
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find jobs created by the logged-in employer
    const jobs = await job.find({ userId: req.user._id }).select('title company description');
    res.json(jobs);
  } catch (error) {
    next(error); // errorHandler middleware
  }
};

export default errorHandler; // Export errorHandler if needed
