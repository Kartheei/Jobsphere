import express from "express";
import {
  registerUser,
  getUserProfile,
  updateUserProfile,
  getCandidateProfileById,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/profile/:userId").get(protect, getCandidateProfileById);

export default router;
