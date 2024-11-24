import React, { useState } from "react";

const HelpdeskPage = () => {
  const [caseDetails, setCaseDetails] = useState({
    victimName: "",
    contact: "",
    email: "",
    caseTitle: "",
    caseDescription: "",
    scammerName: "",
    scammerCompany: "",
    scammerPhone: "",
    scammerAccount: "",
    policeReportNumber: "",
    additionalNote: "",
  });

  const [policeReport, setPoliceReport] = useState(null);
  const [additionalDocuments, setAdditionalDocuments] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: "AI", message: "Hello! How can I assist you today?" },
    { sender: "User", message: "I need help with a scam report." },
    { sender: "AI", message: "Sure! Please provide the details of the scam." },
  ]);
  
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setChatMessages([
        ...chatMessages,
        { sender: "User", message: newMessage },
      ]);
      setNewMessage(""); // Clear input
    }
  };


  const handleInputChange = (e) => {
    setCaseDetails({ ...caseDetails, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    type === "policeReport"
      ? setPoliceReport(file)
      : setAdditionalDocuments(file);
  };

  const handleFormSubmission = () => {
    alert("Case submitted successfully. Our team will contact you shortly.");
    console.log("Case Details:", caseDetails);
    console.log("Police Report File:", policeReport);
    console.log("Additional Documents:", additionalDocuments);
  };

  const handleEdit = () => alert("Edit functionality is not implemented yet.");
  const handleUpdate = () =>
    alert("Update functionality is not implemented yet.");

  return (
    <div className="helpdesk-page">
      {/* Form Section */}
      <div className="form-section">
        <h1>Helpdesk Page</h1>
        <form>
          <h3>Case Details</h3>
          <div className="form-group">
            <label>Victim Name:</label>
            <input
              type="text"
              name="victimName"
              value={caseDetails.victimName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={caseDetails.contact}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={caseDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Case Title:</label>
            <input
              type="text"
              name="caseTitle"
              value={caseDetails.caseTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Case Description:</label>
            <textarea
              name="caseDescription"
              value={caseDetails.caseDescription}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Scammer Name:</label>
            <input
              type="text"
              name="scammerName"
              value={caseDetails.scammerName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Scammer Company Name:</label>
            <input
              type="text"
              name="scammerCompany"
              value={caseDetails.scammerCompany}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Scammer Phone:</label>
            <input
              type="text"
              name="scammerPhone"
              value={caseDetails.scammerPhone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Scammer Account Number:</label>
            <input
              type="text"
              name="scammerAccount"
              value={caseDetails.scammerAccount}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Police Report:</label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "policeReport")}
            />
          </div>
          <div className="form-group">
            <label>Police Report Number:</label>
            <input
              type="text"
              name="policeReportNumber"
              value={caseDetails.policeReportNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Additional Documents:</label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "additionalDocuments")}
            />
          </div>
          <div className="form-group">
            <label>Additional Documents Note:</label>
            <textarea
              name="additionalNote"
              value={caseDetails.additionalNote}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={handleFormSubmission}>
              Submit
            </button>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </form>
      </div>
  
      {/* Assistance Section */}
      <div className="assistance-section">
        <h3>AI Assistance</h3>
        <div className="assistance-buttons">
          <button
            onClick={() =>
              alert("This will open a WhatsApp call to the AI Assistant.")
            }
          >
            Call via WhatsApp
          </button>
          <button
            onClick={() =>
              alert("This will open a Telegram call to the AI Assistant.")
            }
          >
            Call via Telegram
          </button>
        </div>
  
        <h3>AI Chat</h3>
        <div className="chat-window">
          <div className="chat-messages">
            {chatMessages.map((chat, index) => (
              <p key={index}>
                <strong>{chat.sender}:</strong> {chat.message}
              </p>
            ))}
          </div>
          <textarea
            className="chat-input"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  ); 
};

export default HelpdeskPage;
