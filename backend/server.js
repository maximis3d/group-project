require('dotenv').config(); 

const express = require("express");
const connectDB = require("./db"); // Import the connectDB function
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const apiRoutes = require("./ApiApp"); // Import the ApiApp router
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Parse JSON request body
app.use(express.json());

// Connect to MongoDB using the external connectDB function
connectDB()
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// Define routes
app.use('/api/auth', authRoutes); // Only one path for authRoutes
app.use("/user", userRoutes); // Keep this if /user route is needed
app.use('/api', apiRoutes); // Integrate ApiApp routes


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
