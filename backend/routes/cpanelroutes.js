const express = require("express");
const router = express.Router();

// Mock Data (replace with database integration as needed)
const { getUsers } = require("../services/database"); 

// Helper functions
const findUser = (username) => users.find((user) => user.username === username); 

// ---------------- USER MANAGEMENT ----------------
router.get("/users", (req, res) => {
    res.json({ success: true, data: users });
});

router.post("/users/add", (req, res) => {
    const { username, password } = req.body;
    if (findUser(username)) {
        return res.json({ success: false, message: "User already exists." });
    }
    const newUser = { username, password };
    users.push(newUser);
    res.json({ success: true, data: newUser });
});

router.post("/users/delete", (req, res) => {
    const { username } = req.body;
    const index = users.findIndex((user) => user.username === username);
    if (index === -1) {
        return res.json({ success: false, message: "User not found." });
    }
    users.splice(index, 1);
    res.json({ success: true, message: "User deleted successfully." });
});

// ---------------- SOCIAL MEDIA POSTS ----------------
router.get("/forum/posts", (req, res) => {
    res.json({ success: true, data: forumPosts });
});

router.post("/forum/posts/delete", (req, res) => {
    const { postId } = req.body;
    const index = forumPosts.findIndex((post) => post.post_id === postId);
    if (index === -1) {
        return res.json({ success: false, message: "Post not found." });
    }
    forumPosts.splice(index, 1);
    res.json({ success: true, message: "Post deleted successfully." });
});

router.post("/forum/comments/delete", (req, res) => {
    const { postId, commentIndex } = req.body;
    const post = forumPosts.find((post) => post.post_id === postId);
    if (!post) {
        return res.json({ success: false, message: "Post not found." });
    }
    if (!post.comments[commentIndex]) {
        return res.json({ success: false, message: "Comment not found." });
    }
    post.comments.splice(commentIndex, 1);
    res.json({ success: true, message: "Comment deleted successfully." });
});

router.post("/forum/comments/flag", (req, res) => {
    const { postId, commentIndex } = req.body;
    const post = forumPosts.find((post) => post.post_id === postId);
    if (!post) {
        return res.json({ success: false, message: "Post not found." });
    }
    if (!post.comments[commentIndex]) {
        return res.json({ success: false, message: "Comment not found." });
    }
    res.json({ success: true, message: "Comment flagged for review." });
});

// ---------------- NEWS AND ALERTS ----------------
router.get("/news", (req, res) => {
    res.json({ success: true, data: newsPosts });
});

router.post("/news/add", (req, res) => {
    const { title, content } = req.body;
    const newNews = { post_id: newsPosts.length + 1, title, content };
    newsPosts.push(newNews);
    res.json({ success: true, data: newNews });
});

router.post("/news/curate", (req, res) => {
    // Mock AI-curated articles
    const curatedArticles = [
        { title: "Avoid Online Scams", content: "Tips to stay safe online." },
        { title: "Detecting Phishing Emails", content: "How to identify phishing emails." },
    ];
    res.json({ success: true, data: curatedArticles });
});

// ---------------- AI CONFIGURATIONS ----------------
router.post("/ai/tune", (req, res) => {
    const { parameters } = req.body;
    res.json({ success: true, message: "Model tuned successfully.", parameters });
});

router.post("/ai/upload-dataset", (req, res) => {
    const { datasetName } = req.body;
    res.json({ success: true, message: `Dataset "${datasetName}" uploaded successfully.` });
});

router.post("/ai/scan-news", (req, res) => {
    res.json({ success: true, message: "Scanning news and social media for confirmed cases." });
});

router.post("/ai/process-cases", (req, res) => {
    res.json({ success: true, message: "AI processing service desk tickets." });
});

router.post("/ai/update-database", (req, res) => {
    res.json({ success: true, message: "AI updated the database with analyzed data." });
});

// ---------------- DEFAULT HANDLER ----------------
router.get("/", (req, res) => {
    res.json({ message: "Control Panel API is up and running." });
});

module.exports = router;
