const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const express = require("express");

const { authenticate } = require("../middleware/authenticate")
const User = require("../models/User");

let app, mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Setting up a simple express app to test middleware
  app = express();
  app.use(express.json());
  app.get("/protected", authenticate, (req, res) => {
    res.status(200).json({ message: "Access granted", user: req.user });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
  jest.clearAllMocks();
});

describe("Authenticate Middleware", () => {
  it("Should return 401 if no token is provided", async () => {
    const response = await request(app).get("/protected");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authentication required");
  });

  it("Should return 401 if the token is invalid", async () => {
    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer invalidtoken");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid token");
  });

  it("Should return 404 if the user does not exist", async () => {
    // Mock jwt.verify to return a valid payload with a non-existent user ID
    jest.spyOn(jwt, "verify").mockReturnValue({ userId: new mongoose.Types.ObjectId() });

    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer validtoken");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it("Should grant access if token is valid and user exists", async () => {
    // Create a test user in the database
    const user = new User({
      username: "testuser",
      email: "test@example.com",
      password: "password1!",
      age: 25,
      dob: new Date("1996-08-15"),
      weight: 70,
      activity: "Moderately Active"
    });
    await user.save();

    // Mock jwt.verify to return a valid payload with the user's ID
    jest.spyOn(jwt, "verify").mockReturnValue({ userId: user._id });

    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer validtoken");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Access granted");
    expect(response.body.user.username).toBe("testuser");
});
});
