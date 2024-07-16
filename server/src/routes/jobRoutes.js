import { Router } from "express";
import { createJob, getAllJobs, updateJobDetails,getEmployerJobs } from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

// Create new job post
router.post("/createJob", protect, createJob);

// Route to get all jobs
router.get("/", getAllJobs);

// Update Job Details
router.put('/:id', updateJobDetails);

// /Employer Jobs
router.get('/employer/jobs', protect, getEmployerJobs);

export default router;
