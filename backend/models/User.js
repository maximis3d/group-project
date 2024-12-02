const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
    match: [/[^a-zA-Z0-9]/, "Password must contain at least one special character"],
  },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  gender: { type: String, required: true },
  calories: { type: Number, required: true },
  activity: {
    type: String,
    required: true,
    enum: ["Not Active", "Lightly Active", "Moderately Active", "Very Active"],
  },
});

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Only hash the password if it is modified or new
  if (!this.isModified("password")) return next();

  try {
    // Salt rounds can be adjusted for security (e.g., 10-12 is a good range)
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Pre-save middlware to strip time from dob
userSchema.pre("save", async function (next) {
  if (this.dob) {
    // Stripping the time from the 'dob' field
    this.dob = new Date(this.dob).setHours(0, 0, 0, 0);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
