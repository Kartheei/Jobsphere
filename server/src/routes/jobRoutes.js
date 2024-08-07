import { Router } from "express";
import {
  createJob,
  getAllJobs,
  updateJobDetails,
  getEmployerJobs,
  deleteJob,
  getJobById,
  getCandidateAppliedJobs,
  getEmployerStats,
  getRecentJobs,
  searchJobs,
  updateJobStatus,
} from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

// Search jobs by title and location
router.get("/search", searchJobs);

// Create new job post
router.post("/createJob", protect, createJob);

// Route to get all jobs
router.get("/", getAllJobs);

// Route to get job details by ID
router.get("/:id", getJobById);

// Update Job Details
router.put("/employer/:id", updateJobDetails);

// Employer Jobs
router.get("/employer/jobs", protect, getEmployerJobs);

// Delete Job
router.delete("/employer/:id", protect, deleteJob);

// Employer Stats
router.get("/employer/stats", protect, getEmployerStats);

// Recent Jobs
router.get("/employer/recent", protect, getRecentJobs);

// Get candidate Applied Jobs
router.get("/candidate/appliedJobs", protect, getCandidateAppliedJobs);

// Route to update job status
router.patch("/employer/:id/active", protect, updateJobStatus);

export default router;
