// routes/nutrition.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const APP_ID = process.env.API_ID;
const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://trackapi.nutritionix.com/v2';

// Middleware to parse JSON bodies
router.use(express.json());

// Search Route with Nutrient Data
router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  try {
    // Step 1: Search for foods based on the query
    const searchResponse = await axios.get(`${BASE_URL}/search/instant`, {
      params: { query },
      headers: {
        'x-app-id': APP_ID,
        'x-app-key': API_KEY,
      },
    });

    // Assuming the search results are in the 'branded' field
    const foods = searchResponse.data.branded || [];

    // Limit the number of nutrient requests to prevent excessive API calls
    const limitedFoods = foods.slice(0, 10); // Adjust the limit as needed

    // Step 2: For each food item, fetch nutrient data
    const nutrientPromises = limitedFoods.map(async (food) => {
      try {
        const nutrientResponse = await axios.post(
          `${BASE_URL}/natural/nutrients`,
          { query: food.food_name },
          {
            headers: {
              'x-app-id': APP_ID,
              'x-app-key': API_KEY,
              'Content-Type': 'application/json',
            },
          }
        );
        return { ...food, nutrients: nutrientResponse.data };
      } catch (err) {
        console.error(`Error fetching nutrients for ${food.food_name}:`, err.message);
        return { ...food, nutrients: null };
      }
    });

    // Wait for all nutrient data to be fetched
    const foodsWithNutrients = await Promise.all(nutrientPromises);

    res.json({
      query,
      results: foodsWithNutrients,
    });
  } catch (error) {
    console.error('Error fetching data from Nutritionix API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Nutritionix API.' });
  }
});

module.exports = router;
