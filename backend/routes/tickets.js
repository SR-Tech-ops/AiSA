const express = require("express");
const router = express.Router();
const { getTickets, updateTicket, addChatMessage } = require("../services/database");

// Get all tickets
router.get("/tickets", (req, res) => {
  const tickets = getTickets();
  res.json({ success: true, data: tickets });
});

// Update a case
router.post("/tickets/update/:caseId", (req, res) => {
  const { caseId } = req.params;
  const { updateDetails } = req.body;
  const updatedDetails = updateTicket(caseId, updateDetails);
  if (updatedDetails) {
    res.json({ success: true, updatedDetails });
  } else {
    res.status(404).json({ success: false, message: "Case not found." });
  }
});

// Add a chat message
router.post("/tickets/chat/:caseId", (req, res) => {
  const { caseId } = req.params;
  const { message } = req.body;
  const success = addChatMessage(caseId, { sender: "Officer", message });
  if (success) {
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "Case not found." });
  }
});

module.exports = router;
