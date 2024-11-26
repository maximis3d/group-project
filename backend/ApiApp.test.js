

const request = require('supertest');
const axios = require('axios');


process.env.API_ID = 'test_api_id';
process.env.API_KEY = 'test_api_key';


const app = require('./ApiApp'); 


jest.mock('axios');

describe('API App', () => {
  describe('POST /api/nutrition', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return macro and micro nutrients for a valid food item', async () => {
      const mockNutritionData = {
        foods: [
          {
            food_name: 'apple',
            serving_qty: 1,
            serving_unit: 'medium (3" dia)',
            serving_weight_grams: 182,
            nf_calories: 95,
            nf_total_fat: 0.3,
            nf_saturated_fat: 0.1,
            nf_cholesterol: 0,
            nf_sodium: 1.8,
            nf_total_carbohydrate: 25,
            nf_dietary_fiber: 4.4,
            nf_sugars: 19,
            nf_protein: 0.5,
            
          },
        ],
        
      };

     
      axios.post.mockResolvedValue({ data: mockNutritionData });

      const response = await request(app)
        .post('/api/nutrition')
        .send({ food: 'apple' })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockNutritionData);

      
      expect(axios.post).toHaveBeenCalledWith(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        { query: 'apple' },
        {
          headers: {
            'x-app-id': 'test_api_id',
            'x-app-key': 'test_api_key',
            'Content-Type': 'application/json',
          },
        }
      );
    });

    it('should return 400 if food parameter is missing', async () => {
      const response = await request(app)
        .post('/api/nutrition')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toEqual({
        error: 'Food parameter is required in the request body.',
      });

    
      expect(axios.post).not.toHaveBeenCalled();
    });

    it('should handle errors from Nutritionix API gracefully', async () => {
      
      axios.post.mockRejectedValue(new Error('API Error'));

      const response = await request(app)
        .post('/api/nutrition')
        .send({ food: 'apple' })
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toEqual({
        error: 'Failed to fetch nutrition data.',
      });

      
      expect(axios.post).toHaveBeenCalled();
    });
  });
});
