const { registerUser, loginUser } = require('../controller/authController');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

jest.mock('../models/user');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('authController', () => {
  describe('registerUser', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should register a new user successfully', async () => {
      const req = {
        body: {
          Fullname: 'John Doe',
          Email: 'john@example.com',
          JobStatus: 'Developer',
          Password: 'password123',
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne.mockResolvedValueOnce(null);
      bcrypt.hash.mockResolvedValueOnce('hashedPassword');
      User.prototype.save.mockResolvedValueOnce();

      await registerUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ Email: 'john@example.com' });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User registration successful' });
    });

    it('should handle existing email', async () => {
      const req = { body: { Email: 'john@example.com' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne.mockResolvedValueOnce({});

      await registerUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ Email: 'john@example.com' });
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email already exists. Please use a different email or Login.' });
    });

    it('should handle errors', async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne.mockRejectedValueOnce(new Error('Database error'));

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('loginUser', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should login user successfully', async () => {
      const req = { body: { Email: 'john@example.com', Password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const user = { Email: 'john@example.com', Password: 'hashedPassword' };
      User.findOne.mockResolvedValueOnce(user);
      bcrypt.compare.mockResolvedValueOnce(true);
      jwt.sign.mockReturnValueOnce('token');

      await loginUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ Email: 'john@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith({ email: 'john@example.com' }, 'Your_Secret_Token', { expiresIn: '1h' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: 'token', user });
    });

    it('should handle invalid email', async () => {
      const req = { body: { Email: 'john@example.com', Password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne.mockResolvedValueOnce(null);

      await loginUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ Email: 'john@example.com' });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email not found' });
    });

    it('should handle incorrect password', async () => {
      const req = { body: { Email: 'john@example.com', Password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const user = { Email: 'john@example.com', Password: 'hashedPassword' };
      User.findOne.mockResolvedValueOnce(user);
      bcrypt.compare.mockResolvedValueOnce(false);

      await loginUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ Email: 'john@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Password incorrect' });
    });

    it('should handle errors', async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne.mockRejectedValueOnce(new Error('Database error'));

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
