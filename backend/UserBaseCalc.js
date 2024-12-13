const mongoose = require('mongoose');
const { calculateBMR, calculateTDEE } = require('./calculateCalories');
const User = require('./models/User');
require('dotenv').config();

async function calculateAndUpdateUser(userId) {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        
        const user = await User.findById(userId);

        if (!user) {
            console.error(`User with ID ${userId} not found.`);
            return;
        }

        const { weight, height, age, gender, activity } = user;

      
        if (!weight || !height || !age || !gender || !activity) {
            console.error(`User ${user.username} is missing required fields.`);
            return;
        }

       
        const BMR = calculateBMR(weight, height, age, gender);
        const TDEE = calculateTDEE(BMR, activity);

        
        user.BMR = BMR;
        user.TDEE = TDEE;
        await user.save();

        console.log(`Updated user ${user.username}: BMR=${BMR.toFixed(2)}, TDEE=${TDEE.toFixed(2)}`);

        
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("Error:", error);
    }
}


const userId = process.argv[2];

if (!userId) {
    console.error("Please provide a User ID as an argument.");
    process.exit(1);
}

calculateAndUpdateUser(userId);
