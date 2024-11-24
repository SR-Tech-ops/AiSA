const express = require('express');
const router = express.Router();
const { getForum } = require('../services/database');

// In-memory data store for forum posts
let forumPosts = getForum();

// Route to handle liking a post
router.post('/post/:postId/like', (req, res) => {
    const { postId } = req.params;

    const postIndex = forumPosts.findIndex((post) => post.post_id === parseInt(postId));
    if (postIndex === -1) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Increment likes
    forumPosts[postIndex].likes += 1;

    return res.status(200).json({ success: true, message: "Post liked successfully" });
});

// Route to handle disliking a post
router.post('/post/:postId/dislike', (req, res) => {
    const { postId } = req.params;

    const postIndex = forumPosts.findIndex((post) => post.post_id === parseInt(postId));
    if (postIndex === -1) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Increment dislikes
    forumPosts[postIndex].dislikes += 1;

    return res.status(200).json({ success: true, message: "Post disliked successfully" });
});

module.exports = router;
