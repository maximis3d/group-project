const { calculateBMR, calculateTDEE } = require('../calculateCalories');
const { activityLevel } = require('./activityLevel');
jest.mock('./activityLevel');

describe("calculateCalories", () => {
    beforeEach(() => {
        activityLevel.mockImplementation((BMR, active) => {
            const multipliers = {
                1: 1.15,
                2: 1.35,
                3: 1.55,
                4: 1.8
            };
            const multiplier = multipliers[active] || 1.15;
            return BMR * multiplier;
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test("should return correct BMR and TDEE for a male", () => {
        const weight = 70;
        const height = 170;
        const age = 25;
        const active = 2;
        const gender = "male";

        const BMR = calculateBMR(weight, height, age, gender);
        const TDEE = calculateTDEE(BMR, active);

        const expectedBMR = 88.362 + (13.397 * 70) + (4.799 * 170) - (5.677 * 25);
        const expectedTDEE = expectedBMR * 1.35;

        expect(BMR).toBeCloseTo(expectedBMR, 1);
        expect(TDEE).toBeCloseTo(expectedTDEE, 1);
    });

    test("should return correct BMR and TDEE for a female", () => {
        const weight = 60;
        const height = 160;
        const age = 30;
        const active = 3;
        const gender = "female";

        const BMR = calculateBMR(weight, height, age, gender);
        const TDEE = calculateTDEE(BMR, active);

        const expectedBMR = 447.593 + (9.247 * 60) + (3.098 * 160) - (4.330 * 30);
        const expectedTDEE = expectedBMR * 1.55;

        expect(BMR).toBeCloseTo(expectedBMR, 1);
        expect(TDEE).toBeCloseTo(expectedTDEE, 1);
    });
});
