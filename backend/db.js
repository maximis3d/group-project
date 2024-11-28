const mongoose = require("mongoose");
const path = require("path")
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Connect to MongoDB Atlas

const connectDB  = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB")
    }catch (error) {
        console.log('MONGO_URI:', process.env.MONGO_URI);
        console.log("Error connecting to MongoDB:", error);
    }
}

module.exports = connectDB;