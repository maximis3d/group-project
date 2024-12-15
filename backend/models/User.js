const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const calculateBMR = require("../utils/calculateBMR").default
const activityLevel = require("../utils/activityLevel").default


const activityMap = {
  "Not Active": 1.15,
  "Lightly Active": 1.35,
  "Moderately Active": 1.55,
  "Very Active": 1.8,
};

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
  bmr: { type: Number, default: 0 }, 
  tee: { type: Number, default: 0 },
});

// Pre-save middleware to hash password and calculate BMR

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    const bmr = calculateBMR(this.weight, this.height, this.age, this.gender);
    this.bmr = bmr;  

    const activityLevelNum = activityMap[this.activity];
    this.tee = activityLevel(bmr, activityLevelNum); // Calculate TEE

    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  const { weight, height, age, gender, activity } = update;

  if (weight || height || age || activity) {
    const currentUser = await this.model.findOne(this.getQuery());
    const updatedWeight = weight || currentUser.weight;
    const updatedHeight = height || currentUser.height;
    const updatedAge = age || currentUser.age;
    const updatedGender = gender || currentUser.gender;
    const updatedActivity = activity || currentUser.activity;

    const bmr = calculateBMR(updatedWeight, updatedHeight, updatedAge, updatedGender);

    const activityLevelNum = activityMap[updatedActivity];
    const tee = activityLevel(bmr, activityLevelNum);

    this.set("bmr", bmr); 
    this.set("tee", tee); 
  }

  next();
});


// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
