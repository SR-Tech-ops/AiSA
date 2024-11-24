// backend/routes/users.js
const express = require('express');
const fs = require('fs');
const router = express.Router();
const usersFile = './database/users.json';

router.post('/signup', (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) return res.status(400).json({ message: 'Name and Password are required' });

    // Simulate adding user to the database
    const newUser = { id: Date.now().toString(), name, password }; // Simple ID with timestamp
    const users = JSON.parse(fs.readFileSync(usersFile));

    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User created successfully', user: newUser });
});

module.exports = router;
