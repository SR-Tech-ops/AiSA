const express = require('express');
const router = express.Router();
const { getVerified } = require('../services/database');

router.post('/verify', (req, res) => {
    try {
        const { type, value } = req.body;

        if (!type || !value) {
            return res.status(400).json({
                success: false,
                message: "Type and value are required for verification",
            });
        }

        // Fetch verification data
        const verificationData = getVerified();

        // Find matching data
        const result = verificationData.find(
            (item) =>
                item.type.toLowerCase() === type.toLowerCase() &&
                item.value.toLowerCase() === value.toLowerCase()
        );

        if (result) {
            return res.status(200).json({
                success: true,
                message: `${type} verified successfully`,
                data: result,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: `${type} not found`,
            });
        }
    } catch (error) {
        console.error("Error during verification:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to process verification.",
        });
    }
});

module.exports = router;
