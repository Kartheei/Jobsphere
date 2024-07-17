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
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    // Create a new application
    const newApplication = new Application({
      job_id: jobId,
      user_id: userId,
    });

    await newApplication.save();

    // Add the job ID to the user's appliedJobs array
    await User.findByIdAndUpdate(userId, { $push: { appliedJobs: jobId } });

    res
      .status(201)
      .json({ message: "Application submitted successfully", newApplication });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};
