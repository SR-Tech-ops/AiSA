import React, { useState } from "react";

const VerificationPopNote = ({ details, onVerify }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to copy individual data to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <>
      {/* Trigger Button */}
      <button onClick={() => setIsOpen(true)} className="popnote-trigger">
        UIX Data
      </button>

      {/* Pop Note Modal */}
      {isOpen && (
        <div className="popnote-modal">
          <div className="popnote-content">
            <h2>Business Details</h2>
            <ul>
              {details.map((item, index) => (
                <li key={index} className="popnote-item">
                  <p>
                    <strong>Business:</strong> {item.business}{" "}
                    <button onClick={() => handleCopy(item.business)}>
                      Copy
                    </button>
                  </p>
                  <p>
                    <strong>Phone:</strong> {item.phone}{" "}
                    <button onClick={() => handleCopy(item.phone)}>Copy</button>
                  </p>
                  <p>
                    <strong>Account:</strong> {item.account}{" "}
                    <button onClick={() => handleCopy(item.account)}>
                      Copy
                    </button>
                  </p>
                  <div className="popnote-actions">
                    {/* Redirect to Verification Portal */}
                    <button onClick={() => onVerify(item.account)}>
                      Verify Account
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="popnote-close" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VerificationPopNote;
