/**
 * Calculates macronutrients based on a fixed daily calorie intake.
 * @param {number} totalCalories - The total daily calorie intake.
 * @returns {Object} - An object containing grams of Protein, Fats, and Carbohydrates.
 */
export function calculateMacronutrients(totalCalories = 2000) {
  // Define macronutrient distribution percentages
  const macronutrientPercentages = {
    Protein: 0.20,       // 20%
    Fats: 0.30,          // 30%
    Carbohydrates: 0.50, // 50%
  };

  // Calories per gram for each macronutrient
  const caloriesPerGram = {
    Protein: 4,
    Fats: 9,
    Carbohydrates: 4,
  };

  // Calculate grams for each macronutrient
  const Protein = Math.round(
    (totalCalories * macronutrientPercentages.Protein) / caloriesPerGram.Protein
  );
  const Fats = Math.round(
    (totalCalories * macronutrientPercentages.Fats) / caloriesPerGram.Fats
  );
  const Carbohydrates = Math.round(
    (totalCalories * macronutrientPercentages.Carbohydrates) / caloriesPerGram.Carbohydrates
  );

  return {
    Protein,
    Fats,
    Carbohydrates,
  };
}
