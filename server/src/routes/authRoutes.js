import express from 'express';
import { loginUser, logoutUser, forgotPassword, resetPassword } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js'
import { verifyOtp } from "../utils/generateAndVerifyOtp.js";
const router = express.Router();

router.post('/login', loginUser); // Login route
router.post('/logout', logoutUser) // Logout route
router.get('/check', protect, (req, res) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
}); // check authentication status on front-end side.
router.post('/forgot-password', forgotPassword); // Forgot password route
router.post('/verfiy-otp', verifyOtp);  // Verify OTP route
router.post('/reset-password', resetPassword); // Reset password route

export default router;
