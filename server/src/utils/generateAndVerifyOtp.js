import crypto from 'crypto';
import User from "../models/user.js";

//Generate OTP
const generateOtp = () => {
    return crypto.randomBytes(3).toString('hex') // Generate a 6-digit OTP
};

// Verify OTP
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ message: 'OTP verified' });
};

export {generateOtp, verifyOtp};