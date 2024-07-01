import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';

// @desc - Login User
// @access - public
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        generateToken(res, user._id); // This sets the token in a cookie

        // Return necessary user information
        const sanitizedUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        res.status(200).json({ message: 'Login successful', user: sanitizedUser });
    } catch (error) {
        next(error); // Pass the error to the next middleware (error handler)
    }
};

// @desc - Logout User
// @access - private
const logoutUser = async (req, res, next) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({ message: 'User logged out' });
    } catch (error) {
        next(error);
    }
};

export { loginUser, logoutUser };
