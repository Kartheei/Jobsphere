import Job from '../models/Job.js';

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new job
export const createJob = async (req, res) => {
  const { title, description, company, location, salary, postedBy } = req.body;

  const newJob = new Job({
    title,
    description,
    company,
    location,
    salary,
    postedBy
  });

  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
