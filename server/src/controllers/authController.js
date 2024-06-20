import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
export const loginUser = async (req, res, next) => {
   
    const { email, password } = req.body;

    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        next(error); // Pass the error to the next middleware (error handler)
    }
};
export const getProtectedData = (req, res) => {
    res.status(200).json({ message: 'This is protected data', user: req.user });
};
