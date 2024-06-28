import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';

// @desc - Register new user
// @access - public
export const registerUser = async (req, res, next) => {
  const { cfname, clname, cemail, cpassword, cconfirmPassword, role, eoname } = req.body;

  if (cpassword !== cconfirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const userExists = await User.findOne({ email: cemail });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      name: `${cfname} ${clname}`,
      email: cemail,
      password: cpassword,
      role: role || 'Candidate',  // Default role is 'Candidate'
      organizationName: role === 'Employer' ? eoname : undefined,
    });

    const createdUser = await user.save();

    // Generate and set the token
    generateToken(res, createdUser._id);

    // Return necessary user information
    const sanitizedUser = {
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
    };

    res.status(201).json({ message: 'User registered successfully', user: sanitizedUser });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};

// @desc - Get user profile
// @access - private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};

export { getUserProfile }
