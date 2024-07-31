import express from "express";
import {
  registerUser,
  getUserProfile,
  updateUserProfile,
  uploadResume,
  getResume
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
// import multer from 'multer';
import { upload } from '../middlewares/upload.js';



const router = express.Router();

// const upload = multer({ dest: 'uploads/' });

router.post("/register", registerUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/profile/:userId").get(protect, getCandidateProfileById);

router.post('/uploadResume', protect, upload.single('resume'), uploadResume);

router.get('/getResume', protect, getResume);
export default router;
