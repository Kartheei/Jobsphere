import express from 'express';
import { registerUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/register', registerUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
