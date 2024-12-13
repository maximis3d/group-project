const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const apiRoutes = require("./ApiApp");
const userCalcRoutes = require("./routes/userCalc");
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use("/auth", authRoutes);

// Define user routes
app.use("/user", userRoutes);

// Define API routes
app.use("/api", apiRoutes);

// Define user calculation routes
app.use("/usercalc", userCalcRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
