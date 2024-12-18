jest.mock('axios');

const request = require('supertest');
const mongoose = require('mongoose');
const path = require('path');
const axios = require('axios');
const app = require('../server');
const User = require('../models/User');

const agent = request.agent(app);

require('dotenv').config({ path: path.resolve(__dirname, "../.env.test") });

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
  jest.clearAllMocks();
});

describe('User Authentication', () => {
  test('Register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Password@123',
        age: 25,
        dob: '1998-01-01',
        weight: 70,
        height: 175,
        gender: 'male',
        activity: 'Moderately Active',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Registration successful');

    const user = await User.findOne({ username: 'testuser' });
    expect(user).not.toBeNull();
    expect(user.email).toBe('testuser@example.com');
  });

  test('Login with registered user', async () => {
    const user = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'Password@123',
      age: 25,
      dob: '1998-01-01',
      weight: 70,
      height: 175,
      gender: 'male',
      activity: 'Moderately Active',
    });
    await user.save();

    const res = await agent
      .post('/login')
      .send({
        username: 'testuser',
        password: 'Password@123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
  });

  test('Access protected route without authentication', async () => {
    const res = await request(app)
      .get('/user');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
  });

  test('Access protected route with authentication', async () => {
    const resRegister = await agent
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Password@123',
        age: 25,
        dob: '1998-01-01',
        weight: 70,
        height: 175,
        gender: 'male',
        activity: 'Moderately Active',
      });

    expect(resRegister.statusCode).toEqual(201);

    const resLogin = await agent
      .post('/login')
      .send({
        username: 'testuser',
        password: 'Password@123',
      });

    expect(resLogin.statusCode).toEqual(200);

    const resUser = await agent
      .get('/user');

    expect(resUser.statusCode).toEqual(200);
    expect(resUser.body).toHaveProperty('username', 'testuser');
    expect(resUser.body).not.toHaveProperty('password');
  });
});

describe('User Details Update', () => {
  test('Update user details', async () => {
    const resRegister = await agent
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Password@123',
        age: 25,
        dob: '1998-01-01',
        weight: 70,
        height: 175,
        gender: 'male',
        activity: 'Moderately Active',
      });

    expect(resRegister.statusCode).toEqual(201);

    const resLogin = await agent
      .post('/login')
      .send({
        username: 'testuser',
        password: 'Password@123',
      });

    expect(resLogin.statusCode).toEqual(200);

    const resUpdate = await agent
      .patch('/update-details')
      .send({
        username: 'updateduser',
        email: 'updateduser@example.com',
        weight: 75,
      });

    expect(resUpdate.statusCode).toEqual(200);
    expect(resUpdate.body).toHaveProperty('message', 'Details updated successfully');
    expect(resUpdate.body.updatedUser).toHaveProperty('username', 'updateduser');
    expect(resUpdate.body.updatedUser).toHaveProperty('email', 'updateduser@example.com');
    expect(resUpdate.body.updatedUser).toHaveProperty('weight', 75);
  });
});

describe('API Endpoints', () => {
  describe('GET /api/search', () => {
    it('should return search results when a valid query is provided', async () => {
      const mockQuery = 'apple';
      const mockResponseData = {
        products: [
          { food_name: 'Apple', serving_qty: 1, serving_unit: 'medium (182g)' },
        ],
      };

      axios.get.mockResolvedValueOnce({ data: mockResponseData });

      const res = await request(app)
        .get('/api/search')
        .query({ query: mockQuery });
    });

    it('should return 400 if the query parameter is missing', async () => {
      const res = await request(app)
        .get('/api/search');

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Query parameter is required.');
    });

    it('should handle errors from the Nutritionix API gracefully', async () => {
      const mockQuery = 'banana';
      const mockError = new Error('Nutritionix API down');

      axios.get.mockRejectedValueOnce(mockError);

      const res = await request(app)
        .get('/api/search')
        .query({ query: mockQuery });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Failed to fetch data from Nutritionix API.');
      expect(console.error).toHaveBeenCalledWith('Error fetching data from Nutritionix API:', mockError.message);
    });
  });
});