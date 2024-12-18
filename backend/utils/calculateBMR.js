function calculateBMR(weight, height, age, gender) {
    if (gender === "male") {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
}

module.exports = calculateBMR;
