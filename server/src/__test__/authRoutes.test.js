import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';

beforeAll(async () => {
  // Connect to a test database
  const url = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/jobsphere-test';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Disconnect from the test database
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  describe('POST /api/auth/signup', () => {
    it('should create a new user and return 201', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'Test User',
          email: 'testuser@example.com',
          password: 'Password123'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 400 if user already exists', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'Test User',
          email: 'existinguser@example.com',
          password: 'Password123'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in an existing user and return 200', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'existinguser@example.com',
          password: 'Password123'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 400 if email or password is incorrect', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistentuser@example.com',
          password: 'WrongPassword'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Invalid email or password');
    });
  });
});
