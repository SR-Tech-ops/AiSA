import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketingPage = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updateDetails, setUpdateDetails] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Fetch all tickets
    axios.get("http://localhost:5000/api/tickets").then((res) => {
      if (res.data.success) {
        setTickets(res.data.data);
      }
    });
  }, []);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setChatHistory(ticket.chatHistory || []); // Load chat history for the ticket
  };

  const handleUpdateCase = () => {
    if (!selectedTicket) return;
  
    // Simulate case update using mock data
    const updatedDetails = (selectedTicket.updates || "") + " " + updateDetails;
    setSelectedTicket({
      ...selectedTicket,
      updates: updatedDetails,
    });
    setUpdateDetails(""); // Clear the input
    alert("Case updated successfully!");
  };
  

  const handleSendMessage = () => {
    if (!selectedTicket) return;
  
    // Simulate sending a message using mock data
    const newMessage = { sender: "Officer", message: chatMessage };
    const updatedChatHistory = [...chatHistory, newMessage];
  
    setChatHistory(updatedChatHistory);
    setSelectedTicket({
      ...selectedTicket,
      chatHistory: updatedChatHistory,
    });
    setChatMessage(""); // Clear the input
  };
  

  return (
    <div className="expandable-box">
      <h2>NFCC Service Manager</h2>
  
      {/* Tickets Table */}
      <table className="service-manager-table">
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Victim Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Company Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.caseId} onClick={() => handleTicketClick(ticket)} className="table-row">
              <td>{ticket.caseId}</td>
              <td>{ticket.victimName}</td>
              <td>{ticket.contact}</td>
              <td>{ticket.email}</td>
              <td>{ticket.companyName}</td>
              <td>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Ticket Details and Chat */}
      {selectedTicket && (
        <div className="ticket-details">
          <h3>Case Details</h3>
          <p><strong>Victim Name:</strong> {selectedTicket.victimName}</p>
          <p><strong>Contact:</strong> {selectedTicket.contact}</p>
          <p><strong>Email:</strong> {selectedTicket.email}</p>
          <p><strong>Case Description:</strong> {selectedTicket.caseDescription}</p>
          <p><strong>Company Name:</strong> {selectedTicket.companyName}</p>
          <p><strong>Phone:</strong> {selectedTicket.phone}</p>
          <p><strong>Account Number:</strong> {selectedTicket.accountNumber}</p>
          <p><strong>Status:</strong> {selectedTicket.status}</p>
          <p><strong>Updates:</strong> {selectedTicket.updates}</p>
  
          {/* Update Case */}
          <div className="update-case">
            <h3>Update Case</h3>
            <textarea
              value={updateDetails}
              onChange={(e) => setUpdateDetails(e.target.value)}
              placeholder="Enter additional case details"
              rows="4"
              style={{ width: "100%", marginBottom: "10px" }}
            ></textarea>
            <button onClick={handleUpdateCase} className="btn-update">
              Update Case
            </button>
          </div>
  
          {/* Chat Section */}
          <div className="chat-popup">
            <h4>Chat</h4>
            <div className="chat-history">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`chat-message ${chat.sender === "Officer" ? "officer" : "victim"}`}>
                  <strong>{chat.sender}:</strong> {chat.message}
                </div>
              ))}
            </div>
            <textarea
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage} className="btn-chat">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );  
};

export default TicketingPage;
