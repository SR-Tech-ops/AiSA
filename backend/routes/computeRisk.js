const express = require("express");
const router = express.Router();

// Mock database functions
const { getEntityData, updateRiskScore } = require("../services/database");

router.post("/compute-risk", async (req, res) => {
    try {
        const { entity_id, match_score, frequency_score, complaint_count } = req.body;

        // Weights
        const w1 = 0.5, w2 = 0.3, w3 = 0.2;

        // Normalize values
        const normalizedMatch = Math.min(match_score, 100) / 100;
        const normalizedFrequency = Math.min(frequency_score, 10) / 10;
        const normalizedComplaints = Math.min(complaint_count, 5) / 5;

        // Risk Score Calculation
        const riskScore = (w1 * normalizedMatch) + (w2 * normalizedFrequency) + (w3 * normalizedComplaints);

        // Save the calculated score in the database
        await updateRiskScore(entity_id, riskScore * 100);

        res.status(200).json({
            entity_id,
            risk_score: Math.round(riskScore * 100),
            message: "Risk score computed successfully."
        });
    } catch (error) {
        res.status(500).json({ error: "Error computing risk score." });
    }
});

module.exports = router;
