// server.js
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(session);
const cors = require("cors");
const path = require("path");
const axios = require("axios");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const User = require("./models/User");
const WeightLog = require("./models/weightLog");
const SavedFood = require("./models/savedFood");
const MoodLog = require("./models/moodLog")
const { error } = require("console");


const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Helper Functions
 */

const validateFields = (fields) => Object.values(fields).every(value => value !== undefined && value !== null);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// MongoDB Session Store
const store = new MongoDBSession({
  uri: process.env.MONGODB_URI,
  collection: "mySessions",
});

// Session Middleware
app.use( 
  session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

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

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    req.session.isAuth = true;
    req.session.userId = user._id; // Store the user's ID in the session
    req.session.username = user.username; // Store the username in the session
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get("/user", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.patch("/update-details", isAuth, async (req, res) => {
  const { username, email, dob, weight, height, phoneNumber } = req.body;

  try {
    if (username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser.username !== req.session.username) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: req.session.username },
      { username, email, dob, weight, height, phoneNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) {
      req.session.username = username;
    }

    res.status(200).json({
      message: "Details updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
    res.clearCookie("connect.sid", {
      httpOnly: true
    })
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

// Nutrition Route
app.get("/api/search", async (req, res) => {
  const APP_ID = process.env.API_ID;
  const API_KEY = process.env.API_KEY;
  const BASE_URL = "https://trackapi.nutritionix.com/v2";
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  try {
    // Step 1: Search for foods based on the query
    const searchResponse = await axios.get(`${BASE_URL}/search/instant`, {
      params: { query },
      headers: {
        "x-app-id": APP_ID,
        "x-app-key": API_KEY,
        "Content-Type": "application/json"
      },
    });

    console.log("Search query:", query);
    console.log("Search response data:", searchResponse.data);

    const foods = searchResponse.data.branded || [];

    // Limit the number of nutrient requests to prevent excessive API calls
    const limitedFoods = foods.slice(0, 5);
    // Step 2: For each food item, fetch nutrient data
    const nutrientPromises = limitedFoods.map(async (food) => {
      try {
        const nutrientResponse = await axios.post(
          `${BASE_URL}/natural/nutrients`,
          { query: food.food_name },
          {
            headers: {
              "x-app-id": APP_ID,
              "x-app-key": API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        return { ...food, nutrients: nutrientResponse.data };
      } catch (err) {
        console.error(
          `Error fetching nutrients for ${food.food_name}:`,
          err.message
        );
        return { ...food, nutrients: null };
      }
    });

    const foodsWithNutrients = await Promise.all(nutrientPromises);

    res.json({
      query,
      results: foodsWithNutrients,
    });
  } catch (error) {
    console.error("Error fetching data from Nutritionix API:", error.message);
    res.status(500).json({ error: "Failed to fetch data from Nutritionix API." });
  }
})

// Add a new weight log
app.post("/weight-log", isAuth, async (req, res) => {
  const { weight } = req.body;
  if (!weight) {
    return res.status(400).json({ message: "Weight is required" });
  }
  try {
    const newLog = new WeightLog({
      userId: req.session.userId,
      weight,
    });
    await newLog.save();
    res.status(201).json({ message: "Weight log added successfully", log: newLog });
  } catch (error) {
    console.error("Error adding weight log:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get weight logs for logged in user
app.get("/weight-logs", isAuth, async (req, res) => {
  try {
    const logs = await WeightLog.find({ userId: req.session.userId }).sort({ date: 1 });
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching weight logs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Save selected food to database with nurtional details
app.post("/save-food", isAuth, async (req, res) => {
  const { foodName, calories, protein, fat, carbs } = req.body

  if (!validateFields({ foodName, calories, protein, fat, carbs })) {
    return res.status(400).json({ message: "All food details are required" })
  }

  try {
    const newSavedFood = new SavedFood({
      userId: req.session.userId,
      foodName,
      calories,
      protein,
      fat,
      carbs
    })

    await newSavedFood.save()
    res.status(201).json({ message: "Food item saved succesfully", food: newSavedFood })
  } catch (error) {
    console.error("Error saving fod item", error)
    res.status(500).json({ message: "Internal Server Error" })
  }

})

// Retireve saved food items
app.get("/get-saved-foods", isAuth, async (req, res) => {
  try {
    const savedFoods = await SavedFood.find({ userId: req.session.userId }).sort({
      dateAdded: -1,
    });

    res.status(200).json(savedFoods);
  } catch (error) {
    console.error("Error fetching saved foods:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.delete("/delete-saved-food/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    const deletedFood = await SavedFood.findOneAndDelete({
      _id: id,
      userId: req.session.userId,
    });

    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({ message: "Food successfully deleted" });
  } catch (error) {
    console.error("Error deleting saved food:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add a route for mood submission
app.post("/mood-log", isAuth, async (req, res) => {
  const { mood } = req.body;

  if (!mood) {
    return res.status(400).json({ message: "Mood is required" });
  }

  try {
    const newMoodLog = new MoodLog({
      userId: req.session.userId,
      mood: mood,
    });

    await newMoodLog.save();
    res.status(201).json({ message: "Mood logged successfully", mood: newMoodLog });
  } catch (error) {
    console.error("Error logging mood:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/mood-logs", isAuth, async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const filter = { userId: req.session.userId };
    console.log(filter)

    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const moodLogs = await MoodLog.find(filter).sort({ date: 1 });
    res.status(200).json(
      moodLogs.map((log) => ({
        mood: log.mood,
        date: log.date.toISOString(), 
      }))
    );
  } catch (error) {
    console.error("Error fetching mood logs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
