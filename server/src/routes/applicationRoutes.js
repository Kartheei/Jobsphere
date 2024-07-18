import { Router } from "express";
import {
  createApplication,
  getApplicationsByJobId,
} from "../controllers/applicationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", protect, createApplication);
router.get("/job/:jobId", protect, getApplicationsByJobId);

export default router;
