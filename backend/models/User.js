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
  dob: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  gender: { type: String, required: true },
  calories: { type: Number, required: true },
  activity: {
    type: String,
    required: true,
    enum: ["Not Active", "Lightly Active", "Moderately Active", "Very Active"],
  },
  bmi: { type: Number, default: 0 }, // New field for BMI
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

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  const { weight, height } = update;

  console.log("Updating user:", update);

  // Ensure BMI is recalculated if either height or weight is provided
  if (weight || height) {
    // If height is updated, use it to calculate BMI
    const currentUser = await this.model.findOne(this.getQuery());
    const currentWeight = weight || currentUser.weight;
    const currentHeight = height || currentUser.height;

    // Only calculate BMI if both weight and height are available
    if (currentWeight && currentHeight) {
      const heightInMeters = currentHeight / 100; // Convert height to meters
      const bmi = currentWeight / (heightInMeters * heightInMeters); // BMI formula
      console.log("Calculated BMI:", bmi);
      this.set("bmi", bmi); // Update BMI
    }
  }

  next();
});






// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
