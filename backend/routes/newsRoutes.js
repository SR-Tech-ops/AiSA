const express = require('express');
const router = express.Router();
const { getVerified, getNews } = require('../services/database');

// Endpoint: Get Risky Entities
router.get('/risky-entities', (req, res) => {
    const verificationData = getVerified();
    res.status(200).json({ success: true, data: verificationData });
});

// Endpoint: Get Forum Posts
router.get('/news/posts', (req, res) => {
    const newsPosts = getNews();
    res.status(200).json({ success: true, data: newsPosts });
});

module.exports = router;
