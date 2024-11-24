const express = require("express");
const router = express.Router();
const { getUsers } = require("../services/database");

// Login Route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check for missing fields
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required." });
  }

  // Validate user credentials
  const user = getUsers().find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return res.status(200).json({ success: true, message: "Login successful." });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials." });
  }
});

module.exports = router;
