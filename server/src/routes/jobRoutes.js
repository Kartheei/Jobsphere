import { Router } from 'express';
import { createJob } from '../controllers/jobController.js'; // Use named import
import { getAllJobs } from '../controllers/jobController.js';

const router = Router();
router.post('/jobs', createJob);

// Define route to get all jobs
router.get('/jobs', getAllJobs);

export default router; // Use default export


