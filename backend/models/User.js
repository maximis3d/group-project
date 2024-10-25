// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    activity: {type: String, required: true, enum: ["Not Active", "Lightly Active", "Moderately Active", "Very Active"]}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
