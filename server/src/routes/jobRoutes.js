import express from 'express';
const router = express.Router();
import { getJobs, createJob } from '../controllers/jobController.js';

router.get('/', getJobs);
router.post('/', createJob);

export default router;
