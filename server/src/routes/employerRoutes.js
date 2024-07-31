import express from "express";
import {
  getEmployerProfile,
  updateEmployerProfile,
} from "../controllers/employerController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get employer profile data
router.get("/profile", protect, getEmployerProfile);

router.put("/profile", protect, updateEmployerProfile);

export default router;
