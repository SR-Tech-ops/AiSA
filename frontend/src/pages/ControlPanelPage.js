import React, { useEffect, useState } from "react";
import axios from "axios";

const ControlPanelPage = () => {
  const [users, setUsers] = useState([
    { username: "john_doe", password: "password123" },
    { username: "jane_doe", password: "securepassword" },
    { username: "admin_user", password: "admin1234" },
  ]);
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [banReason, setBanReason] = useState("");
  const [banDuration, setBanDuration] = useState("");
  const [muteDuration, setMuteDuration] = useState("");
  const [banDetails, setBanDetails] = useState([]);
  const [muteDetails, setMuteDetails] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [datasets, setDatasets] = useState([]);
  const [tasks, setTasks] = useState([]);

  const banReasons = ["vulgar", "spammer", "scammer", "fake profile"]; // Dropdown options

  useEffect(() => {
    // Fetch posts
    axios.get("http://localhost:5000/api/forum/posts").then((res) => {
      if (res.data.success) setPosts(res.data.data);
    });

    // Fetch tasks (mock data for now)
    setTasks(["Moderate Risky Entities", "Detect New Scams", "Enhance Training"]);

    // Fetch datasets (mock data for now)
    setDatasets(["Dataset1.csv", "Dataset2.csv", "Dataset3.csv"]);
  }, []);

  // User Management Handlers
  const handleAddUser = () => {
    if (!newUser.username || !newUser.password) {
      alert("Username and password cannot be empty.");
      return;
    }

    setUsers([...users, newUser]);
    setNewUser({ username: "", password: "" });
    alert("User added successfully.");
  };

  const handleDeleteUser = (username) => {
    setUsers(users.filter((user) => user.username !== username));
    alert(`User "${username}" deleted.`);
  };


  const handleBanUser = (username) => {
    if (!banDuration) {
      alert("Please select a duration for the ban.");
      return;
    }

    const details = {
      username,
      reason: banReason,
      duration: banDuration,
    };

    setBanDetails([...banDetails, details]);
    alert(`User "${username}" banned for ${banDuration} due to: ${banReason}`);
  };

  const handleMuteUser = (username) => {
    if (!muteDuration) {
      alert("Please select a duration for the mute.");
      return;
    }

    const details = {
      username,
      duration: muteDuration,
    };

    setMuteDetails([...muteDetails, details]);
    alert(`User "${username}" muted for ${muteDuration}`);
  };

  // Social Media Handlers
  const handleDeletePost = () => {
    alert(`Post "${selectedPost}" deleted.`);
  };

  const handleDeleteComment = () => {
    alert(`Comment "${selectedComment}" deleted.`);
  };

  const handleFlagComment = () => {
    alert(`Comment "${selectedComment}" flagged for review.`);
  };

  const handleAutomateTask = () => {
    alert("AI task automation initiated.");
  };

  // News and Alerts Handlers
  const handleAddNews = () => {
    alert(`News "${newsTitle}" added with content: ${newsContent}`);
    setNewsTitle("");
    setNewsContent("");
  };

  const handleCurateGuides = () => {
    alert("AI curated self-help guides successfully.");
  };

  const handleSearchScams = () => {
    alert("AI searched and detected latest scams.");
  };

  // AI-Related Handlers
  const handleTuneModel = () => {
    alert("AI model tuned successfully.");
  };

  const handleUploadDataset = (dataset) => {
    alert(`Dataset "${dataset}" uploaded successfully.`);
  };

  const handleScanNewsSocialMedia = () => {
    alert("AI scanning news and social media for confirmed cases.");
  };

  const handleProcessCases = () => {
    alert("AI processing service desk tickets.");
  };

  const handleUpdateDatabase = () => {
    alert("AI updated the database with analyzed data.");
  };

  return (
    <div className="control-panel">
      <h2>Control Panel</h2>
  
      {/* User Management */}
      <div className="control-panel-box">
        <h3>User Management</h3>
        <div className="user-management">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <button onClick={handleAddUser}>Add User</button>
        </div>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.username} 
              <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
              <button onClick={() => handleMuteUser(user.username)}>Mute</button>
              <button onClick={() => handleBanUser(user.username)}>Ban</button>
            </li>
          ))}
        </ul>
        <div className="ban-settings">
          <h4>Ban Settings</h4>
          <label>
            Ban Reason:
            <select value={banReason} onChange={(e) => setBanReason(e.target.value)}>
              {banReasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </label>
          <label>
            Ban Duration:
            <input
              type="datetime-local"
              value={banDuration}
              onChange={(e) => setBanDuration(e.target.value)}
            />
          </label>
        </div>
        <div className="mute-settings">
          <h4>Mute Settings</h4>
          <label>
            Mute Duration:
            <input
              type="datetime-local"
              value={muteDuration}
              onChange={(e) => setMuteDuration(e.target.value)}
            />
          </label>
        </div>
        <h4>Banned Users</h4>
        <ul>
          {banDetails.map((ban, index) => (
            <li key={index}>
              {ban.username} - Banned for: {ban.reason}, Duration: {ban.duration}
            </li>
          ))}
        </ul>
        <h4>Muted Users</h4>
        <ul>
          {muteDetails.map((mute, index) => (
            <li key={index}>
              {mute.username} - Muted for: {mute.duration}
            </li>
          ))}
        </ul>
      </div>
  
      {/* Social Media Posts */}
      <div className="control-panel-box">
        <h3>Social Media Posts</h3>
        <select onChange={(e) => setSelectedPost(e.target.value)} defaultValue="">
          <option value="" disabled>Select a post</option>
          {posts.map((post) => (
            <option key={post.post_id} value={post.post_id}>
              {post.title}
            </option>
          ))}
        </select>
        <button onClick={handleDeletePost}>Delete Post</button>
        <button onClick={handleAutomateTask}>Automate AI Task</button>
      </div>
  
      {/* News and Alerts */}
      <div className="control-panel-box">
        <h3>News and Alerts</h3>
        <input
          type="text"
          placeholder="News Title"
          value={newsTitle}
          onChange={(e) => setNewsTitle(e.target.value)}
        />
        <textarea
          placeholder="News Content"
          value={newsContent}
          onChange={(e) => setNewsContent(e.target.value)}
        ></textarea>
        <button onClick={handleAddNews}>Add News</button>
        <button onClick={handleSearchScams}>Search Scams</button>
        <button onClick={handleCurateGuides}>Curate Guides</button>
      </div>
  
      {/* AI Configurations */}
      <div className="control-panel-box">
        <h3>AI Configurations</h3>
        <button onClick={handleTuneModel}>Tune Model</button>
        <select onChange={(e) => handleUploadDataset(e.target.value)}>
          <option value="" disabled>Upload Dataset</option>
          {datasets.map((dataset) => (
            <option key={dataset} value={dataset}>{dataset}</option>
          ))}
        </select>
      </div>
  
      {/* AI Model */}
      <div className="control-panel-box">
        <h3>AI Model</h3>
        <button onClick={handleScanNewsSocialMedia}>Scan News/Social Media</button>
        <button onClick={handleProcessCases}>Process Cases</button>
        <button onClick={handleUpdateDatabase}>Update Database</button>
      </div>
    </div>
  );  
};

export default ControlPanelPage;
