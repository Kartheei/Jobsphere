import express from 'express';
import { loginUser,getProtectedData } from '../controllers/authController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/login', loginUser);
router.get('/api/protected', authMiddleware, getProtectedData);

export default router;
