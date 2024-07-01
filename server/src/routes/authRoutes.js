import express from 'express';
import { loginUser, logoutUser } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post('/login', loginUser); // Login route
router.post('/logout', logoutUser) // Logout route
router.get('/check', protect, (req, res) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
}); // check authentication status on front-end side.


export default router;
