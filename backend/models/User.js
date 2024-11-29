// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
    match: [/[^a-zA-Z0-9]/, "Password must contain at least one special character"]
  },
    age: { type: Number, required: true },
    dob: {type: Date, required: true},
    weight: {type: Number, required: true},
    height: {type: Number, required: true},
    gender: {type: String, required: true},
    calories: {type: Number, required: true},
    activity: {type: String, required: true, enum: ["Not Active", "Lightly Active", "Moderately Active", "Very Active"]}
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the given password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

