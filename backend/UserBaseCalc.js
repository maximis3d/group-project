const readline = require('readline');
const { calculateBMR, calculateTDEE } = require('./calculateCalories');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function userDetails() {
    rl.question("Enter your weight in kg: ", (w) => {
        const weight = parseFloat(w);
        if (isNaN(weight) || weight <= 0) {
            console.error("Invalid weight entered.");
            rl.close();
            return;
        }

        rl.question("Enter your height in cm: ", (h) => {
            const height = parseFloat(h);
            if (isNaN(height) || height <= 0) {
                console.error("Invalid height entered.");
                rl.close();
                return;
            }

            rl.question("Enter your age in years: ", (a) => {
                const age = parseInt(a, 10);
                if (isNaN(age) || age <= 0) {
                    console.error("Invalid age entered.");
                    rl.close();
                    return;
                }

                rl.question("Enter your activity level (1-4): ", (ac) => {
                    const activityLevel = parseInt(ac, 10);
                    if (![1, 2, 3, 4].includes(activityLevel)) {
                        console.error("Activity level must be between 1 and 4.");
                        rl.close();
                        return;
                    }

                    rl.question("Enter your gender (male or female): ", (g) => {
                        const gender = g.toLowerCase();
                        if (!['male', 'female'].includes(gender)) {
                            console.error("Gender must be either 'male' or 'female'.");
                            rl.close();
                            return;
                        }

                        const BMR = calculateBMR(weight, height, age, gender);
                        const TDEE = calculateTDEE(BMR, activityLevel);
                        console.log(`Your BMR is: ${BMR.toFixed(2)}`);
                        console.log(`Your Total Daily Energy Expenditure (TDEE) is: ${TDEE.toFixed(2)}`);
                        rl.close();
                    });
                });
            });
        });
    });
}

userDetails();
