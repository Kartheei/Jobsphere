import express from 'express';
const router = express.Router();
import { getJobs, createJob, updateJob,getJobList } from '../controllers/jobController.js';

router.get('/', getJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.get('/getJobList', getJobList);
export default router;
