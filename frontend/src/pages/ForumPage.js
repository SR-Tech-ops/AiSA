import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ForumPage = () => {
    const [riskyEntities, setRiskyEntities] = useState([]);
    const [forumPosts, setForumPosts] = useState([]);
    const [newPost, setNewPost] = useState({ user: "", title: "", content: "" });
    const [newComment, setNewComment] = useState({}); // For holding new comments for each post

    useEffect(() => {
        // Fetch risky entities
        axios.get('http://localhost:5000/api/risky-entities').then((res) => {
            if (res.data.success) setRiskyEntities(res.data.data);
        });

        // Fetch forum posts
        axios.get('http://localhost:5000/api/forum/posts').then((res) => {
            if (res.data.success) setForumPosts(res.data.data);
        });
    }, []);

    // Handle new post creation
    const handleNewPostSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/forum/post', newPost);
            if (res.data.success) setForumPosts([...forumPosts, res.data.data]);
            setNewPost({ user: "", title: "", content: "" });
        } catch (error) {
            alert("Failed to create post.");
        }
    };

    // Handle likes
    const handleLike = async (postId) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/forum/post/${postId}/like`);
            if (res.data.success) {
                setForumPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.post_id === postId ? { ...post, likes: post.likes + 1 } : post
                    )
                );
            }
        } catch (error) {
            alert("Failed to like the post.");
        }
    };

    // Handle dislikes
    const handleDislike = async (postId) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/forum/post/${postId}/dislike`);
            if (res.data.success) {
                setForumPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.post_id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
                    )
                );
            }
        } catch (error) {
            alert("Failed to dislike the post.");
        }
    };

    // Handle adding a new comment
    const handleAddComment = async (postId) => {
        const commentContent = newComment[postId]?.trim();
        if (!commentContent) return alert("Comment cannot be empty.");

        try {
            const res = await axios.post(`http://localhost:5000/api/forum/post/${postId}/comment`, {
                user: "Anonymous", // Replace with logged-in user's name if available
                content: commentContent,
            });
            if (res.data.success) {
                setForumPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.post_id === postId
                            ? { ...post, comments: [...post.comments, res.data.data] }
                            : post
                    )
                );
                setNewComment((prevComments) => ({ ...prevComments, [postId]: "" })); // Reset comment input
            }
        } catch (error) {
            alert("Failed to add a comment.");
        }
    };

    return (
        <div className="forum-page">
          <h2>Awareness Media</h2>
      
          {/* Forum Posts */}
          <div className="forum-posts">
            <h3>Social Alerts</h3>
            <ul>
              {forumPosts.map((post) => (
                <li key={post.post_id} className="forum-post">
                  <div className="post-header">
                    <h4>{post.title}</h4>
                    <p className="post-user">by {post.user}</p>
                    <p>AI Score: <span className="ai-score">{post.aiScore || 'N/A'}</span></p> {/* Display AI score */}
                  </div>
                  <p className="post-content">{post.content}</p>
                  <div className="post-actions">
                    <p>
                      Likes: {post.likes} <button onClick={() => handleLike(post.post_id)} className="like-button">Like</button>
                    </p>
                    <p>
                      Dislikes: {post.dislikes} <button onClick={() => handleDislike(post.post_id)} className="dislike-button">Dislike</button>
                    </p>
                  </div>
                  <div className="comments-section">
                    <h5>Comments:</h5>
                    {post.comments && post.comments.length > 0 ? (
                      <ul className="comments-list">
                        {post.comments.map((comment, index) => (
                          <li key={index} className="comment-item">
                            <strong>{comment.user}:</strong> {comment.content}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No comments yet</p>
                    )}
                    <div className="add-comment">
                      <input
                        type="text"
                        value={newComment[post.post_id] || ""}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            [post.post_id]: e.target.value,
                          })
                        }
                        placeholder="Add a comment..."
                        className="comment-input"
                      />
                      <button onClick={() => handleAddComment(post.post_id)} className="comment-button">
                        Comment
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
      
          {/* New Post Form */}
          <div className="new-post-form">
            <h3>Create New Post</h3>
            <form onSubmit={handleNewPostSubmit}>
              <input
                type="text"
                value={newPost.user}
                onChange={(e) => setNewPost({ ...newPost, user: e.target.value })}
                placeholder="Your name"
                required
                className="new-post-input"
              />
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Post title"
                required
                className="new-post-input"
              />
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Write your post here"
                required
                className="new-post-textarea"
              />
              <button type="submit" className="new-post-submit">Submit</button>
            </form>
          </div>
        </div>
    );      
};

export default ForumPage;
