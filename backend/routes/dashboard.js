const express = require("express");
const router = express.Router();

// Mock database
const { getUserActivities, getRiskScores , getVerified } = require("../services/database");

// Get user activities
router.get("/activities", (req, res) => {
    try {
        const activities = getUserActivities();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user activities." });
    }
});

// Get risk scores
router.get("/risk-scores", (req, res) => {
    try {
        const riskScores = getRiskScores();
        res.status(200).json(riskScores);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch risk scores." });
    }
});

// Get risk scores
router.get("/verify", (req, res) => {
    try {
        const verify = getVerified();
        res.status(200).json(verify);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch verification." });
    }
});


module.exports = router;
