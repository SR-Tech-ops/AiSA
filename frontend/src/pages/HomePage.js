import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://aisa-qfsr.onrender.com/api/login", {
        username,
        password,
      });

      if (res.data.success) {
        // Redirect to Dashboard
        navigate("/home");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="homepage">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome to AiSA
      </h1>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Artificial Intelligence Scam Alert & Prevention Systems
      </h1>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>NFCC Portal</h1>
      <nav>
        <ul className="menu-grid">
          <li><a href="/dashboard">NFCC Dashboard</a></li>
          <li><a href="/servicemanager">NFCC Service Desk</a></li>
          <li><a href="/cpanel">NFCC cPanel</a></li>
          <li><a href="/verification">Verification Portal</a></li>
          <li><a href="/helpdesk">Help-Desk Center</a></li>
          <li><a href="/forum">Awareness Social Media</a></li>
          <li><a href="/news">News and Alerts Board</a></li>
          <li><a href="/ai">AiSA: Your Online Guardian</a></li>
          <li><a href="/techsupport">Technical Support</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a href="/signout">Sign Out</a></li>
        </ul>
      </nav>
    </div>
  );  
};

export default HomePage;
