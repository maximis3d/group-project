const mongoose = require("mongoose");

const moodLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MoodLog", moodLogSchema);