
jest.mock('mongoose', () => ({
    connect: jest.fn(),
    disconnect: jest.fn(),
}));

jest.mock('../utils/calculateCalories', () => ({
    calculateBMR: jest.fn(),
    calculateTDEE: jest.fn(),
}));

jest.mock('../models/User', () => ({
    findById: jest.fn(),
}));

const mongoose = require('mongoose');
const { calculateBMR, calculateTDEE } = require('../utils/calculateCalories');
const User = require('../models/User');
const { calculateAndUpdateUser } = require('../UserBaseCalc');

describe('calculateAndUpdateUser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update user with correct BMR and TDEE', async () => {
        const mockUserId = '507f1f77bcf86cd799439011';
        const mockUser = {
            _id: mockUserId,
            username: 'testuser',
            weight: 70,
            height: 175,
            age: 30,
            gender: 'Male',
            activity: 'Moderately Active',
            save: jest.fn()
        };

        // Mock mongoose.connect
        mongoose.connect.mockResolvedValueOnce();

        // Mock User.findById
        User.findById.mockResolvedValueOnce(mockUser);

        // Mock calculateBMR and calculateTDEE
        calculateBMR.mockReturnValueOnce(1600);
        calculateTDEE.mockReturnValueOnce(2500);

        // Mock mongoose.disconnect
        mongoose.disconnect.mockResolvedValueOnce();

        // Execute the function
        await calculateAndUpdateUser(mockUserId);

        // Assertions
        expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        expect(User.findById).toHaveBeenCalledWith(mockUserId);

        expect(calculateBMR).toHaveBeenCalledWith(70, 175, 30, 'Male');
        expect(calculateTDEE).toHaveBeenCalledWith(1600, 'Moderately Active');

        expect(mockUser.BMR).toBe(1600);
        expect(mockUser.TDEE).toBe(2500);
        expect(mockUser.save).toHaveBeenCalled();

        expect(mongoose.disconnect).toHaveBeenCalled();
    });

    it('should log error if user not found', async () => {
        const mockUserId = '507f1f77bcf86cd799439012';

        // Mock mongoose.connect
        mongoose.connect.mockResolvedValueOnce();

        // Mock User.findById to return null
        User.findById.mockResolvedValueOnce(null);

        // Mock console.error
        console.error = jest.fn();

        
        await calculateAndUpdateUser(mockUserId);

        
        expect(User.findById).toHaveBeenCalledWith(mockUserId);
        expect(console.error).toHaveBeenCalledWith(`User with ID ${mockUserId} not found.`);
   
    });

    it('should log error if required fields are missing', async () => {
        const mockUserId = '507f1f77bcf86cd799439013';
        const mockUser = {
            _id: mockUserId,
            username: 'testuser',
            weight: null, 
            height: 175,
            age: 30,
            gender: 'Male',
            activity: 'Moderately Active'
        };

       
        mongoose.connect.mockResolvedValueOnce();

      
        User.findById.mockResolvedValueOnce(mockUser);

        console.error = jest.fn();

       
        await calculateAndUpdateUser(mockUserId);

        
        expect(console.error).toHaveBeenCalledWith(`User ${mockUser.username} is missing required fields.`);
     
    });

    it('should handle mongoose connection errors', async () => {
        const mockUserId = '507f1f77bcf86cd799439014';
        const mockError = new Error('Connection failed');

        
        mongoose.connect.mockRejectedValueOnce(mockError);

        
        console.error = jest.fn();

        mongoose.disconnect.mockResolvedValueOnce();

       
        await calculateAndUpdateUser(mockUserId);

      
        expect(console.error).toHaveBeenCalledWith("Error:", mockError);
        expect(mongoose.disconnect).toHaveBeenCalled();
    });
});
