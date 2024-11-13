const readline = require('readline');
const { calculateBMR, calculateTDEE } = require('./calculateCalories');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function userDetails() {
    rl.question("Enter your weight in kg: ", (w) => {
        const weight = parseFloat(w);
        rl.question("Enter your height in cm: ", (h) => {
            const height = parseFloat(h);
            rl.question("Enter your age in years: ", (a) => {
                const age = parseInt(a, 10);
                rl.question("Enter your activity level (1-4): ", (ac) => {
                    const active = parseInt(ac, 10);
                    rl.question("Enter your gender (male or female): ", (g) => {
                        const gender = g.toLowerCase();
                        const BMR = calculateBMR(weight, height, age, gender);
                        const TDEE = calculateTDEE(BMR, active);
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
