import { jobs as Job } from "../models/job.js";
import User from "../models/user.js";
import Application from "../models/Application.js";

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

// /Update Job details
export const updateJobDetails = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, company, location, salary } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        title,
        description,
        company,
        location,
        salary,
        updatedAt: new Date().toISOString(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updatedJob);
  } catch (error) {
    next(error);
  }
};

// Get Jobs based on employer login
export const getEmployerJobs = async (req, res, next) => {
  try {
    // Ensure the user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Find jobs created by the logged-in employer
    const jobs = await Job.find({ userId: req.user._id });
    console.log("Jobs:", jobs);

    // Retrieve the organization name from the user's information
    const user = await User.findById(req.user._id).select("organizationName");
    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Push the application count into the response for each job
    const jobsWithDetails = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await Application.countDocuments({
          job_id: job._id,
        });
        return {
          ...job._doc,
          applicationCount,
        };
      })
    );

    res.status(200).json(jobsWithDetails);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};


// Fetch all jobs
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate({
      path: "userId",
      select: "name organizationName",
    });
    res.status(200).json(jobs);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

// @desc - Delete job by ide
export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.user || req.user.role !== "Employer") {
      return res
        .status(403)
        .json({ message: "Not authorized to delete a job" });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this job" });
    }

    await Job.deleteOne({ _id: id });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getCandidateAppliedJobs = async (req, res, next) => {

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = req.user._id;

    // Find the user's applications and populate job details
    const userApplications = await Application.find({ user_id: userId }).populate('job_id');

    if (!userApplications) {
      return res.status(404).json({ message: "No applications found" });
    }

    // Extract job details from applications
    const appliedJobs = userApplications.map(app => app.job_id);

    return res.status(200).json(appliedJobs);
  } catch (error) {
    next(error);
  }
};

// Fetch job details by ID
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate({
      path: "userId",
      select: "name organizationName",
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

// get the total job posts and applications received
export const getEmployerStats = async (req, res, next) => {
  try {
    const employerId = req.user._id;

    // Total job posts by the employer
    const totalJobPosts = await Job.countDocuments({ userId: employerId });

    // Total applications received for jobs posted by the employer
    const jobs = await Job.find({ userId: employerId }).select("_id");
    const jobIds = jobs.map((job) => job._id);
    const totalApplicationsReceived = await Application.countDocuments({
      job_id: { $in: jobIds },
    });

    res.status(200).json({ totalJobPosts, totalApplicationsReceived });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

// Get two recent Jobs based on employer login
export const getRecentJobs = async (req, res, next) => {
  try {
    // Ensure the user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Find jobs created by the logged-in employer, sorted by creation date
    const jobs = await Job.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(2)
      .select("title description createdAt");

    res.status(200).json(jobs);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};
