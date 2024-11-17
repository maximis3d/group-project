const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  loginAt: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String },
  logoutAt: { type: Date },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
