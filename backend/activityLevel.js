const notActive = 1.15;
const lightlyActive = 1.35;
const moderatelyActive = 1.55;
const veryActive = 1.8;

function activityLevel(BMR, active) {
    let TotalExpenditure;
    if (active === 1) {
        TotalExpenditure = BMR * notActive;
    } else if (active === 2) {
        TotalExpenditure = BMR * lightlyActive;
    } else if (active === 3) {
        TotalExpenditure = BMR * moderatelyActive;
    } else {
        TotalExpenditure = BMR * veryActive;
    }
    return TotalExpenditure;
}

module.exports = { activityLevel };
