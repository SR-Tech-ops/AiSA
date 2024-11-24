import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [userType, setUserType] = useState(""); // Dropdown selection: "NFCC" or "User"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        userType,
        username,
        password,
      });

      if (res.data.success) {
        // Redirect based on userType
        if (userType === "NFCC") {
          navigate("/nfcc");
        } else if (userType === "User") {
          navigate("/rakyat");
        }
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="homepage"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        className="login-section"
        style={{
          width: "50%",
          padding: "30px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          background: "white",
          borderRadius: "10px",
          transform: "scale(1.5)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {/* Dropdown Section */}
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "1.2rem",
                background: "#fff",
                appearance: "none", // Ensures consistent dropdown styles
              }}
            >
              <option value="" disabled>
                Select User Type
              </option>
              <option value="NFCC">NFCC</option>
              <option value="User">User</option>
            </select>
          </div>
  
          {/* Username and Password Section */}
          {userType && (
            <>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Username:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    fontSize: "1.2rem",
                  }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    fontSize: "1.2rem",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: "#0077b6",
                  color: "white",
                  border: "none",
                  padding: "15px",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  borderRadius: "5px",
                  transition: "background 0.3s ease, transform 0.2s ease",
                }}
                onMouseOver={(e) => (e.target.style.background = "#48cae4")}
                onMouseOut={(e) => (e.target.style.background = "#0077b6")}
              >
                Login
              </button>
            </>
          )}
        </form>
        {error && (
          <p style={{ color: "red", marginTop: "20px", textAlign: "center" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );  
};

export default LoginPage;
