const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error('MongoDB connection error:', err));

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

// Define other routes
app.use('/api/auth', authRoutes);
// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use("/auth", authRoutes);

// Define user routes
app.use("/user", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
