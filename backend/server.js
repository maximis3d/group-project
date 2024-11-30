const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(session);
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
  console.log("MongoDB Connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// MongoDB Session Store
const store = new MongoDBSession({
  uri: process.env.MONGODB_URI,
  collection: "mySessions",
});

// Session Middleware
app.use(session({
  secret: "key that will sign cookie",
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication Middleware
const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Routes
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (typeof user.comparePassword !== "function") {
      console.error("comparePassword is not defined on the user instance");
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    req.session.isAuth = true;
    return res.status(200).json({ message: "Login successful", redirectUrl: "/dashboard" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/register", async (req, res, next) => {
  const {
    username,
    email,
    password,
    age,
    dob,
    weight,
    height,
    gender,
    calories,
    activity,
  } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
      age,
      dob,
      weight,
      height,
      gender,
      calories,
      activity,
    });

    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

app.get("/dashboard", isAuth, (req, res) => {
  res.status(200).json({ message: `Welcome User ${req.session.userId}` });
});

app.get("/validate-session", (req, res) => {
  if (req.session && req.session.isAuth) {
    return res.status(200).json({ isAuthenticated: true });
  } else {
    return res.status(401).json({ isAuthenticated: false });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("testusermax123")
});
