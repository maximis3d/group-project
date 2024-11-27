const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("User Model", () => {
  it("Should create a user with valid fields", async () => {
    const user = new User({
      username: "testuser",
      email: "test@example.com",
      password: "password1!",
      age: 25,
      dob: new Date("1996-08-15"),
      weight: 70,
      calories: 2000,
      gender: "Male",
      height: 175,
      activity: "Moderately Active"
    });
    
    const savedUser = await user.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe("testuser");
  });

  it("Should require a username", async () => {
    const user = new User({
      email: "test@example.com",
      password: "password1!",
      age: 25,
      dob: new Date("1996-08-15"),
      weight: 70,
      calories: 2000,
      gender: "Male",
      height: 175,
      activity: "Moderately Active"
    });

    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.username).toBeDefined();
  });

  it("Should require a valid email format", async () => {
    const user = new User({
      username: "testuser",
      email: "invalidemail",
      password: "password1!",
      age: 25,
      dob: new Date("1996-08-15"),
      calories: 2000,
      gender: "Male",
      height: 175,
      weight: 70,
      activity: "Moderately Active"
    });

    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.email).toBeDefined();
  });

  it("Should require a password with at least one special character and minimum length of 8", async () => {
    const user = new User({
      username: "testuser",
      email: "test@example.com",
      password: "password", // no special character, less than 8 chars
      age: 25,
      dob: new Date("1996-08-15"),
      weight: 70,
      activity: "Moderately Active"
    });

    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.password).toBeDefined();
  });

  it("Should hash the password before saving", async () => {
    const user = new User({
      username: "testuser",
      email: "test@example.com",
      password: "password1!",
      age: 25,
      dob: new Date("1996-08-15"),
      weight: 70,
      calories: 2000,
      gender: "Male",
      height: 175,
      activity: "Moderately Active"
    });

    await user.save();
    const savedUser = await User.findOne({ email: "test@example.com" });
    expect(savedUser.password).not.toBe("password1!");
    expect(await bcrypt.compare("password1!", savedUser.password)).toBe(true);
  });

  it("Should correctly compare passwords using comparePassword method", async () => {
    const user = new User({
      username: "testuser",
      email: "test@example.com",
      password: "password1!",
      age: 25,
      dob: new Date("1996-08-15"),
      weight: 70,
      calories: 2000,
      gender: "Male",
      height: 175,
      activity: "Moderately Active"
    });

    await user.save();
    const savedUser = await User.findOne({ email: "test@example.com" });
    const isMatch = await savedUser.comparePassword("password1!");
    expect(isMatch).toBe(true);

    const isNotMatch = await savedUser.comparePassword("wrongpassword");
    expect(isNotMatch).toBe(false);
  });

  it("Should only accept valid values for activity", async () => {
    const user = new User({
      username: "testuser",
      email: "test@example.com",
      password: "password1!",
      age: 25,
      dob: new Date("1996-08-15"),
      weight: 70,
      calories: 2000,
      gender: "Male",
      height: 175,
      activity: "Super Active" // Invalid value
    });

    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.activity).toBeDefined();
  });
});
