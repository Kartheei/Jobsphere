import Application from "../models/Application.js";
import User from "../models/user.js";

// @desc - Create a new job application
// @access - private
export const createApplication = async (req, res, next) => {
  try {
    const { jobId } = req.body;
    const userId = req.user._id;

    // Check if the user has already applied for this job
    const existingApplication = await Application.findOne({
      job_id: jobId,
      user_id: userId,
    });
    if (existingApplication) {
      return res.status(200).json({
        message: "You have already applied for this job",
        status: existingApplication.status,
      });
    }

    // Create a new application
    const newApplication = new Application({
      job_id: jobId,
      user_id: userId,
    });

    await newApplication.save();

    // Add the job ID to the user's appliedJobs array
    await User.findByIdAndUpdate(userId, { $push: { appliedJobs: jobId } });

    res.status(201).json({
      message: "Application submitted successfully",
      newApplication,
      status: newApplication.status,
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

// @desc - Get applications for a specific job
// @access - private
export const getApplicationsByJobId = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job_id: jobId }).populate({
      path: "user_id",
      select: "name",
    });

    if (!applications || applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for this job" });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error.message, error.stack);
    next(error); // Pass the error to the error handler middleware
  }
};

// @desc - Get the application status for a job
// @access - private
export const getApplicationStatus = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    const application = await Application.findOne({
      job_id: jobId,
      user_id: userId,
    });

    if (application) {
      return res.status(200).json({ status: application.status });
    }

    res.status(404).json({ message: "No application found for this job" });
  } catch (error) {
    next(error);
  }
};
