const express = require("express");
const connectDB = require("./db"); // Import the connectDB function
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request body (important to have this near the top)
app.use(express.json());

// Connect to MongoDB using the external connectDB function
connectDB()
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define a new route to get usernames
app.get('/api/usernames', async (req, res) => {
  try {
    const database = mongoose.connection.db;
    const collection = database.collection('collectionName'); // Replace with your actual collection name
    
    const usernames = await collection.find({}, { projection: { username: 1, _id: 0 } }).toArray();
    res.json(usernames);
  } catch (error) {
    console.error("Error fetching usernames:", error);
    res.status(500).send("Error fetching usernames");
  }
});

// Define routes
app.use('/api/auth', authRoutes); // Only one path for authRoutes
app.use("/user", userRoutes); // Keep this if /user route is needed

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
