import React from "react";
import { useNavigate } from "react-router-dom";

const SignOutPage = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    alert("You have been signed out successfully!");
    // Clear session or user data
    // Redirect to login or home page
    navigate("/");
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sign Out</h1>
      <p>Are you sure you want to sign out?</p>
      <div>
        <button
          onClick={handleSignOut}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Yes, Sign Out
        </button>
        <button
          onClick={handleCancel}
          style={{
            backgroundColor: "gray",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignOutPage;
