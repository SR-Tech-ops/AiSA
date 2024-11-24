import React, { useState } from "react";

const UserDashboard = () => {
  // Mock Data
  const mockSocialMediaPosts = [
    { date: "2024-11-10", platform: "Twitter", content: "Just joined this amazing platform!" },
    { date: "2024-11-12", platform: "Facebook", content: "Looking forward to exploring new features." },
  ];

  const mockHelpdeskTickets = [
    { ticketId: "HD1234", date: "2024-11-15", title: "Site Outage", status: "Resolved" },
    { ticketId: "HD5678", date: "2024-11-16", title: "Request for Integration", status: "In Progress" },
  ];

  const mockChatHistory = [
    { date: "2024-11-17", time: "10:00 AM", message: "How can I submit a case?" },
    { date: "2024-11-17", time: "10:05 AM", message: "Follow the instructions on the Helpdesk page." },
  ];

  const mockGuides = [
    { topic: "How to Submit a Helpdesk Ticket", instructions: "Navigate to the Helpdesk page and fill out the form." },
    { topic: "How to Chat with AI Assistant", instructions: "Use the chat window at the bottom right of your screen." },
    { topic: "How to View Social Media Posts", instructions: "Access the 'Social Media Posts' section on your dashboard." },
  ];

  const [selectedGuide, setSelectedGuide] = useState(null);

  const handleOpenGuide = (guide) => {
    setSelectedGuide(guide);
  };

  const handleCloseGuide = () => {
    setSelectedGuide(null);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">User Dashboard</h2>
  
      <div className="dashboard-sections">
        {/* Social Media Posts Table */}
        <div className="dashboard-box">
          <h3>Social Media Posts</h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Platform</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {mockSocialMediaPosts.map((post, index) => (
                <tr key={index}>
                  <td>{post.date}</td>
                  <td>{post.platform}</td>
                  <td>{post.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Helpdesk Tickets Table */}
        <div className="dashboard-box">
          <h3>Helpdesk Tickets</h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Date</th>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockHelpdeskTickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket.ticketId}</td>
                  <td>{ticket.date}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Chat History Table */}
        <div className="dashboard-box">
          <h3>Chat History with AI</h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {mockChatHistory.map((chat, index) => (
                <tr key={index}>
                  <td>{chat.date}</td>
                  <td>{chat.time}</td>
                  <td>{chat.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Self-Help Guide Portal */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Self-Help Guide</h3>
        {mockGuides.map((guide, index) => (
          <button
            key={index}
            onClick={() => handleOpenGuide(guide)}
            style={{ display: "block", marginBottom: "10px", padding: "10px" }}
          >
            {guide.topic}
          </button>
        ))}
      </div>

      {selectedGuide && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "20px",
          }}
        >
          <h2>{selectedGuide.topic}</h2>
          <p>{selectedGuide.instructions}</p>
          <button onClick={handleCloseGuide} style={{ padding: "10px", marginTop: "20px" }}>
            Close
          </button>
        </div>
      )}

      {/* AI Assistant Chat Window */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "300px",
          height: "400px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div style={{ padding: "10px", backgroundColor: "#f1f1f1", borderBottom: "1px solid #ccc" }}>
          <strong>AI Assistant</strong>
        </div>
        <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
          <p><strong>AI:</strong> How can I assist you today?</p>
          <p><strong>User:</strong> What are the platform's key features?</p>
          <p><strong>AI:</strong> You can manage tickets, view social media activity, and chat with me!</p>
        </div>
        <input type="text" placeholder="Type a message..." style={{ padding: "10px", border: "none", borderTop: "1px solid #ccc" }} />
      </div>
    </div>
  );
};

export default UserDashboard;
