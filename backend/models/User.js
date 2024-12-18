const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const calculateBMR = require("../utils/calculateBMR");
const activityLevel = require("../utils/activityLevel")

const WeightLog = require("./weightLog")

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
  activity: {
    type: String,
    required: true,
    enum: ["Not Active", "Lightly Active", "Moderately Active", "Very Active"],
  },
  bmr: { type: Number, default: 0 },
  tee: { type: Number, default: 0 },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
});

// Pre-save middleware to hash password and calculate BMR, TEE, and macronutrients
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    const bmr = calculateBMR(this.weight, this.height, this.age, this.gender);
    this.bmr = bmr;

    const activityLevelNum = activityMap[this.activity];
    this.tee = activityLevel(bmr, activityLevelNum); // Calculate TEE

    // Calculate macronutrients based on TEE
    const proteinPercentage = 0.2;  // 20% of total calories
    const fatPercentage = 0.3;      // 30% of total calories
    const carbsPercentage = 0.5;    // 50% of total calories

    const totalCalories = this.tee;  // Assuming TEE is the total calories needed per day

    this.calories = totalCalories;
    this.protein = (totalCalories * proteinPercentage) / 4;  // Protein is 4 calories per gram
    this.fat = (totalCalories * fatPercentage) / 9;          // Fat is 9 calories per gram
    this.carbs = (totalCalories * carbsPercentage) / 4;      // Carbs is 4 calories per gram

    next();
  } catch (err) {
    next(err);
  }
});

// Pre-update middleware to calculate updated macronutrients based on new TEE
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  const { weight } = update;

  if (weight) {
    try {
      const currentUser = await this.model.findOne(this.getQuery());

      const WeightLog = require("./weightLog"); 
      await WeightLog.create({
        userId: currentUser._id,
        weight,
      });

      const updatedWeight = weight;
      const updatedHeight = update.height || currentUser.height;
      const updatedAge = update.age || currentUser.age;
      const updatedGender = update.gender || currentUser.gender;
      const updatedActivity = update.activity || currentUser.activity;

      const bmr = calculateBMR(updatedWeight, updatedHeight, updatedAge, updatedGender);
      const activityLevelNum = activityMap[updatedActivity];
      const tee = activityLevel(bmr, activityLevelNum);

      this.set("bmr", bmr);
      this.set("tee", tee);

      // Recalculate macronutrients based on updated TEE
      this.set("protein", (tee * 0.2) / 4);
      this.set("fat", (tee * 0.3) / 9);
      this.set("carbs", (tee * 0.5) / 4);
    } catch (error) {
      return next(error);
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
