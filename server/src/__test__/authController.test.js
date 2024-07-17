import { loginUser, logoutUser } from '../src/controllers/authController';
import User from '../src/models/user';
import bcrypt from 'bcryptjs';
import generateToken from '../src/utils/generateToken';

jest.mock('../src/models/user');
jest.mock('bcryptjs');
jest.mock('../src/utils/generateToken');

describe('Auth Controller', () => {
  describe('loginUser', () => {
    it('should login user successfully', async () => {
      const req = {
        body: { email: 'test@example.com', password: 'password123' }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      User.findOne.mockResolvedValue({ _id: '1', email: 'test@example.com', password: 'hashedpassword' });
      bcrypt.compare.mockResolvedValue(true);
      generateToken.mockReturnValue('token');

      await loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpassword');
      expect(generateToken).toHaveBeenCalledWith(res, '1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        user: { _id: '1', name: undefined, email: 'test@example.com', role: undefined }
      });
    });

    it('should handle user not found', async () => {
      const req = { body: { email: 'notfound@example.com', password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      User.findOne.mockResolvedValue(null);

      await loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'notfound@example.com' });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should handle invalid credentials', async () => {
      const req = { body: { email: 'test@example.com', password: 'wrongpassword' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      User.findOne.mockResolvedValue({ email: 'test@example.com', password: 'hashedpassword' });
      bcrypt.compare.mockResolvedValue(false);

      await loginUser(req, res, next);

      expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashedpassword');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
  });

  describe('logoutUser', () => {
    it('should logout user successfully', async () => {
      const req = {};
      const res = { cookie: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await logoutUser(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('jwt', '', { httpOnly: true, expires: new Date(0) });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User logged out' });
    });
  });
});
