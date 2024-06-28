import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protect = async (req, res, next) => {
    let token;

    if (req.cookies.jwt) {
        try {
            // Get token from cookies
            token = req.cookies.jwt;

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            next(error); // Pass the error to the next middleware (error handler);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export { protect };
