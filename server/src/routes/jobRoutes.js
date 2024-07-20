import { Router } from "express";
import {
  createJob,
  getAllJobs,
  updateJobDetails,
  getEmployerJobs,
  deleteJob,
  getJobById,
  getEmployerStats,
  getRecentJobs,
} from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

// Create new job post
router.post("/createJob", protect, createJob);

// Route to get all jobs
router.get("/", getAllJobs);

// Route to get job details by ID
router.get("/:id", getJobById);

// Update Job Details
router.put("/employer/:id", updateJobDetails);

// /Employer Jobs
router.get("/employer/jobs", protect, getEmployerJobs);

// Delete Job
router.delete("/employer/:id", protect, deleteJob);

// Employer Stats
router.get("/employer/stats", protect, getEmployerStats);

// Recent Jobs
router.get("/employer/recent", protect, getRecentJobs);

export default router;
