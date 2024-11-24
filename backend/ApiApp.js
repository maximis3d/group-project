const express = require('express');
const axios = require('axios');
require('dotenv').config(); 

const router = express.Router();

const APP_ID = process.env.API_ID;
const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://trackapi.nutritionix.com/v2';

// Search Route
router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  try {
    const response = await axios.get(`${BASE_URL}/search/instant`, {
      params: { query },
      headers: {
        'x-app-id': APP_ID,
        'x-app-key': API_KEY,
      },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Nutritionix API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Nutritionix API.' });
  }
});

// Nutrition Route
router.post('/nutrition', async (req, res) => {
  const { food } = req.body;

  if (!food) {
    return res.status(400).json({ error: 'Food parameter is required in the request body.' });
  }

  try {
    const response = await axios.post(`${BASE_URL}/natural/nutrients`, 
      { query: food }, 
      {
        headers: {
          'x-app-id': APP_ID,
          'x-app-key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching nutrition data:', error.message);
    res.status(500).json({ error: 'Failed to fetch nutrition data.' });
  }
});

module.exports = router;