import User from '../models/user.js';
import { errorHandler } from '../middlewares/errorHandler.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error); // errorHandler middleware
  }
};

export const createUser = async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error); // errorHandler middleware
  }
};

export default errorHandler; // Export errorHandler if needed
