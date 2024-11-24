// backend/utils/riskScore.js
const calculateRiskScore = (data) => {
    // Example risk score based on mock data
    let score = 0;
    if (data.includes('scam')) score += 50;
    if (data.includes('reported')) score += 30;
    return score;
};

module.exports = { calculateRiskScore };
