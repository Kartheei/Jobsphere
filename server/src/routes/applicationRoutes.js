import { Router } from "express";
import {
  createApplication,
  getApplicationsByJobId,
  getApplicationStatus,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", protect, createApplication);
router.get("/job/:jobId", protect, getApplicationsByJobId);
router.get("/status/:jobId", protect, getApplicationStatus);
router.put("/:id", protect, updateApplicationStatus);

export default router;
