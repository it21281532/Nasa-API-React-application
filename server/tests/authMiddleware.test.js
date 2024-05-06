const jwt = require("jsonwebtoken");
const authenticate = require('../middleware/authMiddleware');


// Mocking Express request and response objects
const req = {
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIn0.5tjZjK8TWiJkD3YOtDC0McoTrW8KvkYR74EcSc7GXa8' // Sample JWT token
  }
};
const res = {
  status: jest.fn(() => res),
  json: jest.fn()
};
const next = jest.fn();

describe('authenticate middleware', () => {
  it('should call next() if token is valid', () => {
    // Mocking jwt.verify to return a decoded token
    jwt.verify = jest.fn().mockReturnValue({ email: 'example@example.com' });

    authenticate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.userData.email).toBe('example@example.com');
  });

  it('should return 401 if token is invalid', () => {
    // Mocking jwt.verify to throw an error
    jwt.verify = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Auth failed!" });
  });
});
