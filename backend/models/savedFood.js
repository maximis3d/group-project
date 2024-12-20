const mongoose = require("mongoose")

const savedFoodschema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        foodName: { type: String, required: true },
        calories: { type: Number, required: true },
        protein: { type: Number, required: true },
        fat: { type: Number, required: true },
        carbs: { type: Number, required: true },
    },
    {timestamps: true}
);

module.exports = mongoose.model("SavedFood", savedFoodschema)