
const express = require("express");
const session = require("express-session")
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(session)
const path = require("path")
const bcrypt = require("bcrypt")
const cors = require("cors")
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// const connectDB = require("./db");
// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");
const User = require("./models/User")

const app = express();
const PORT = process.env.PORT


mongoose.connect(process.env.MONGODB_URI).then(res => {
  console.log("MongoDB Connected")
})

const store = new MongoDBSession({
  uri: process.env.MONGODB_URI,
  collection: "mySessions"
})

// Define session
app.use(session({
  secret: "key that will sign cookie",
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,              
}));

const isAuth = (req, res, next) => {
  if(req.session.isAuth) {
    next()
  } else{
    res.redirect("/login")
  }
}


app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

// // Define authentication routes
// app.use("/auth", authRoutes);

// // Define user routes
// app.use("/user", userRoutes);



app.post("/login", async (req, res, next) => {
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
    return res.status(200).json({ message: "Login successful", redirectUrl: "/dashboard" });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if(err) throw err;
    res.redirect("/") 
  })
})