import { registerUser, getUserProfile } from '../src/controllers/userController';
import User from '../src/models/user';
import generateToken from '../src/utils/generateToken';

jest.mock('../src/models/user');
jest.mock('bcryptjs', () => ({
  hash: jest.fn(() => 'hashedpassword'),
  compare: jest.fn()
}));
jest.mock('../src/utils/generateToken');

describe('User Controller', () => {
  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      const req = {
        body: {
          cfname: 'John',
          clname: 'Doe',
          cemail: 'john@example.com',
          cpassword: 'password123',
          cconfirmPassword: 'password123',
          role: 'Candidate'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      User.findOne.mockResolvedValue(null);
      User.prototype.save = jest.fn().mockResolvedValue({
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Candidate'
      });

      await registerUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(User.prototype.save).toHaveBeenCalled();
      expect(generateToken).toHaveBeenCalledWith(res, '1');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        user: { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'Candidate' }
      });
    });

    it('should handle existing user', async () => {
      const req = { body: { cemail: 'john@example.com' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      User.findOne.mockResolvedValue({ email: 'john@example.com' });

      await registerUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });
  });

  describe('getUserProfile', () => {
    it('should get user profile successfully', async () => {
      const req = { user: { _id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      User.findById.mockResolvedValue({
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Candidate'
      });

      await getUserProfile(req, res, next);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Candidate',
        profile: undefined
      });
    });

    it('should handle user not found', async () => {
      const req = { user: { _id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      User.findById.mockResolvedValue(null);

      await getUserProfile(req, res, next);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });
});
