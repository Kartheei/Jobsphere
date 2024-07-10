import { jobs as Job } from "../models/job.js";

// Create a new job
export async function createJob(req, res, next) {
  const {
    title,
    description,
    location,
    salary,
    requirements,
    job_type,
    // companyId,
  } = req.body;

  try {
    if (!req.user || req.user.role !== "Employer") {
      return res
        .status(403)
        .json({ message: "Not authorized to create a job" });
    }

    const job = new Job({
      title,
      description,
      location,
      salary,
      requirements,
      job_type,
      // companyId,
      userId: req.user._id, // Save the logged-in user ID
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
}

// Fetch all jobs
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate("userId", "-password");
    res.status(200).json(jobs);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};
