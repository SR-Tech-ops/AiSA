const express = require('express');
const router = express.Router();
const { getVerified, getForum } = require('../services/database');

// Endpoint: Get Risky Entities
router.get('/risky-entities', (req, res) => {
    const verificationData = getVerified();
    res.status(200).json({ success: true, data: verificationData });
});

// Endpoint: Get Forum Posts
router.get('/forum/posts', (req, res) => {
    const forumPosts = getForum();
    res.status(200).json({ success: true, data: forumPosts });
});

// Endpoint: Create a New Forum Post
router.post('/forum/post', (req, res) => {
    const { user, title, content } = req.body;
    if (!user || !title || !content) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const forumPosts = getForum();
    const newPost = {
        post_id: forumPosts.length + 1,
        user,
        title,
        content,
        likes: 0,
        dislikes: 0,
        comments: [],
    };
    forumPosts.push(newPost);
    res.status(201).json({ success: true, data: newPost });
});

// Endpoint: Like/Dislike a Post
router.post('/forum/post/:id/react', (req, res) => {
    const { id } = req.params;
    const { type } = req.body; // 'like' or 'dislike'

    const forumPosts = getForum();
    const post = forumPosts.find((p) => p.post_id === parseInt(id));

    if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }
    if (type === 'like') post.likes++;
    if (type === 'dislike') post.dislikes++;
    res.status(200).json({ success: true, data: post });
});

// Endpoint: Add a Comment to a Post
router.post('/forum/post/:id/comment', (req, res) => {
    const { id } = req.params;
    const { user, content } = req.body;

    const forumPosts = getForum();
    const post = forumPosts.find((p) => p.post_id === parseInt(id));

    if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }
    if (!user || !content) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    post.comments.push({ user, content });
    res.status(200).json({ success: true, data: post });
});

module.exports = router;
