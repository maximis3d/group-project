// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
