import React, { useState } from "react";

const TechSupportForm = () => {
  const [outageType, setOutageType] = useState("");
  const [severity, setSeverity] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [outageDescription, setOutageDescription] = useState("");

  const [supportQuery, setSupportQuery] = useState("");
  const [serviceRequest, setServiceRequest] = useState("");
  const [serviceRequestType, setServiceRequestType] = useState("");

  const handleOutageSubmit = () => {
    if (isOnline) {
      alert("Site is functional. The outage report has been submitted successfully.");
    } else {
      alert(
        "High Severity Top Priority Alert dispatched to Level 3 Backend Engineering and IT Service Delivery Management Team. 99.9% SLA executed immediately."
      );
    }
  };

  const handleSupportQuerySubmit = () => {
    alert("Our Technical Support Engineers will contact you shortly. Thank you.");
  };

  const handleServiceRequestSubmit = () => {
    const caseId = `TS-${Math.floor(1000 + Math.random() * 9000)}`;
    alert(`Your case ID is ${caseId}. Our Technical Executive will contact you now. Please stay by your phone. Thank you.`);
  };

  return (
    <div className="itsm-form-container">
      <h2 className="form-title">Tech Support Form</h2>
  
      {/* Outage Table */}
      <div className="form-section">
        <h3 className="section-title">Outage Table</h3>
  
        <label className="label">Type of Outage:</label>
        <select
          className="input-field"
          value={outageType}
          onChange={(e) => setOutageType(e.target.value)}
        >
          <option value="">Select Outage Type</option>
          <option value="Network">Network</option>
          <option value="Server">Server</option>
          <option value="Database">Database</option>
          <option value="Application">Application</option>
        </select>
  
        <label className="label">Severity:</label>
        <select
          className="input-field"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="">Select Severity</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
  
        <label className="label">Is the site still online?</label>
        <input
          className="checkbox-input"
          type="checkbox"
          checked={isOnline}
          onChange={() => setIsOnline(!isOnline)}
        />
  
        <label className="label">Description:</label>
        <textarea
          className="textarea-field"
          value={outageDescription}
          onChange={(e) => setOutageDescription(e.target.value)}
          placeholder="Describe the issue..."
        ></textarea>
  
        <button className="submit-btn" onClick={handleOutageSubmit}>
          Submit
        </button>
      </div>
  
      {/* Contact Technical Support Engineers */}
      <div className="form-section">
        <h3 className="section-title">Contact Technical Support Engineers</h3>
        <label className="label">Your Query:</label>
        <textarea
          className="textarea-field"
          value={supportQuery}
          onChange={(e) => setSupportQuery(e.target.value)}
          placeholder="Write your query here..."
        ></textarea>
  
        <button className="submit-btn" onClick={handleSupportQuerySubmit}>
          Send
        </button>
      </div>
  
      {/* Service Request Form */}
      <div className="form-section">
        <h3 className="section-title">Service Request Form</h3>
        <label className="label">Type of Request:</label>
        <select
          className="input-field"
          value={serviceRequestType}
          onChange={(e) => setServiceRequestType(e.target.value)}
        >
          <option value="">Select Request Type</option>
          <option value="Issue">Issue</option>
          <option value="Implementation">Implementation</option>
          <option value="Integration">Integration</option>
          <option value="Edits">Edits</option>
          <option value="AI">AI</option>
          <option value="Datasets">Datasets</option>
          <option value="Functions">Functions</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Errors">Errors</option>
          <option value="Others">Others</option>
        </select>
  
        <label className="label">Description:</label>
        <textarea
          className="textarea-field"
          value={serviceRequest}
          onChange={(e) => setServiceRequest(e.target.value)}
          placeholder="Describe your request..."
        ></textarea>
  
        <button className="submit-btn" onClick={handleServiceRequestSubmit}>
          Submit
        </button>
      </div>
  
      {/* Direct Call Buttons */}
      <div className="form-section">
        <h3 className="section-title">Contact Us Directly</h3>
        <button className="contact-btn" onClick={() => alert("Calling via WhatsApp...")}>
          Call via WhatsApp
        </button>
        <button className="contact-btn" onClick={() => alert("Calling via Phone...")}>
          Call via Phone
        </button>
        <button className="contact-btn" onClick={() => alert("Calling via Telegram...")}>
          Call via Telegram
        </button>
      </div>
    </div>
  );  
};

export default TechSupportForm;
