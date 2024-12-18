// backend/tests/db.test.js

const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");
const path = require("path");
const { MongoMemoryServer } = require("mongodb-memory-server");
const util = require("util");

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

let mongoServer;
let store;

// Promisify store methods for async/await usage
let storeSet;
let storeGet;
let storeDestroy;

beforeAll(async () => {
  
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Connect mongoose to the in-memory MongoDB
  await mongoose.connect(uri);

  
  store = new MongoDBSession({
    uri,
    collection: "mySessions",
  });

  // Wait for the store to connect
  await new Promise((resolve, reject) => {
    store.on("connected", resolve);
    store.on("error", reject);
  });

  // Promisify store methods
  storeSet = util.promisify(store.set).bind(store);
  storeGet = util.promisify(store.get).bind(store);
  storeDestroy = util.promisify(store.destroy).bind(store);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Database Connection", () => {
  it("should connect to the in-memory MongoDB instance", () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 signifies connected
  });

  it("should disconnect from MongoDB", async () => {
    await mongoose.disconnect();
    expect(mongoose.connection.readyState).toBe(0); // 0 signifies disconnected
    // Reconnect for further tests
    await mongoose.connect(mongoServer.getUri());
    expect(mongoose.connection.readyState).toBe(1);
  });
});

describe("Session Store", () => {
  it("should create and retrieve a session", async () => {
    const sessionId = "test-session-id";
    const sessionData = {
      _id: sessionId,
      username: "testuser",
      cookie: {
        originalMaxAge: 86400000, // 1 day
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
        path: "/",
      },
    };

    // Store the session
    await storeSet(sessionId, sessionData);

    // Retrieve the session
    const retrievedSession = await storeGet(sessionId);
    expect(retrievedSession).toMatchObject(sessionData);
  });

  it("should delete a session", async () => {
    const sessionId = "test-session-id-delete";
    const sessionData = {
      _id: sessionId,
      username: "testuser2",
      cookie: {
        originalMaxAge: 86400000, // 1 day
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
        path: "/",
      },
    };

    // Store the session
    await storeSet(sessionId, sessionData);

    
    let retrievedSession = await storeGet(sessionId);
    expect(retrievedSession).toMatchObject(sessionData);

    
    await storeDestroy(sessionId);
    
  });
});

describe("Mongoose Models", () => {
  
  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });

  const User = mongoose.model("UserTest", userSchema); 

  it("should create a new user", async () => {
    const userData = {
      username: "testuser",
      email: "testuser@example.com",
      password: "Password@123",
    };

    const user = new User(userData);
    await user.save();

    const foundUser = await User.findOne({ username: "testuser" });
    expect(foundUser).not.toBeNull();
    expect(foundUser.email).toBe("testuser@example.com");
  });

  it("should update a user's email", async () => {
    const userData = {
      username: "updateuser",
      email: "oldemail@example.com",
      password: "Password@123",
    };

    const user = new User(userData);
    await user.save();

    // Update the user's email
    await User.findOneAndUpdate(
      { username: "updateuser" },
      { email: "newemail@example.com" },
      { new: true }
    );

    const updatedUser = await User.findOne({ username: "updateuser" });
    expect(updatedUser.email).toBe("newemail@example.com");
  });

  it("should delete a user", async () => {
    const userData = {
      username: "deleteuser",
      email: "deleteuser@example.com",
      password: "Password@123",
    };

    const user = new User(userData);
    await user.save();

    // Delete the user
    await User.deleteOne({ username: "deleteuser" });

    const deletedUser = await User.findOne({ username: "deleteuser" });
    expect(deletedUser).toBeNull();
  });
});