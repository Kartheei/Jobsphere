import { Router } from 'express';
import { createJob } from '../controllers/jobController.js'; // Use named import

const router = Router();
router.post('/jobs', createJob);

export default router; // Use default export