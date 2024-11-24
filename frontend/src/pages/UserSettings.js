import React, { useState } from "react";

const UserSettings = () => {
  // Mock User Data
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, Cityville, Country",
    occupation: "Software Engineer",
    password: "********",
    securityQuestions: [
      { question: "What is your mother's maiden name?", answer: "*******" },
      { question: "What was your first pet's name?", answer: "*******" },
    ],
    twoFactorAuth: false,
  });

  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    alert("Your settings have been saved!");
    setEditMode(false);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
    if (confirmDelete) {
      alert("Your account has been deleted.");
    }
  };

  return (
    <div className="user-settings-container">
      <h2 className="page-title">User Settings</h2>
  
      {/* User Profile Section */}
      <div className="profile-section">
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h3>{userDetails.name}</h3>
          <p>{userDetails.email}</p>
        </div>
      </div>
  
      {/* Editable Personal Details */}
      <div className="settings-section personal-info">
        <h3>Personal Information</h3>
        {editMode ? (
          <div className="edit-form">
            <label>
              Name:
              <input type="text" defaultValue={userDetails.name} />
            </label>
            <label>
              Email:
              <input type="email" defaultValue={userDetails.email} />
            </label>
            <label>
              Phone:
              <input type="text" defaultValue={userDetails.phone} />
            </label>
            <label>
              Address:
              <input type="text" defaultValue={userDetails.address} />
            </label>
            <label>
              Occupation:
              <input type="text" defaultValue={userDetails.occupation} />
            </label>
            <button onClick={handleSave} className="save-button">Save</button>
          </div>
        ) : (
          <div className="display-info">
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <p><strong>Address:</strong> {userDetails.address}</p>
            <p><strong>Occupation:</strong> {userDetails.occupation}</p>
            <button onClick={() => setEditMode(true)} className="edit-button">Edit</button>
          </div>
        )}
      </div>
  
      {/* Security Settings */}
      <div className="settings-section security-settings">
        <h3>Security Settings</h3>
        <p><strong>Password:</strong> {userDetails.password}</p>
        <button className="action-button" onClick={() => alert("Redirecting to Change Password page...")}>Change Password</button>
        <hr />
        <p><strong>2FA:</strong> {userDetails.twoFactorAuth ? "Enabled" : "Disabled"}</p>
        <button className="action-button" onClick={() => alert("2FA settings updated.")}>
          {userDetails.twoFactorAuth ? "Disable 2FA" : "Enable 2FA"}
        </button>
        <hr />
        <h4>Security Questions</h4>
        <ul>
          {userDetails.securityQuestions.map((q, index) => (
            <li key={index}>
              {q.question}: {q.answer} <button className="edit-button">Edit</button>
            </li>
          ))}
        </ul>
      </div>
  
      {/* Delete Account */}
      <div className="settings-section delete-account">
        <h3>Delete Account</h3>
        <p>Deleting your account will permanently remove all your data. This action is irreversible.</p>
        <button onClick={handleDeleteAccount} className="delete-button">
          Delete Account
        </button>
      </div>
    </div>
  );  
};

export default UserSettings;
