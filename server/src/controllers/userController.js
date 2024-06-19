import bcrypt from 'bcryptjs';
import User from '../models/user.js';

// User registration
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
      profile: {
        organizationName: role === 'Employer' ? eoname : undefined,
      }
    });

    const createdUser = await user.save();
    res.status(201).json({ message: 'User registered successfully', user: createdUser });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};
