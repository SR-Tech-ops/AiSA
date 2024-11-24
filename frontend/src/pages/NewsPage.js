import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsPage = () => {
    const [riskyEntities, setRiskyEntities] = useState([]);
    const [newsPosts, setNewsPosts] = useState([]);
    const [newPost, setNewPost] = useState({ user: "", title: "", content: "" });
    const [newComment, setNewComment] = useState({}); // For holding new comments for each post

    useEffect(() => {
        // Fetch risky entities
        axios.get('http://localhost:5000/api/risky-entities').then((res) => {
            if (res.data.success) setRiskyEntities(res.data.data);
        });

        // Fetch forum posts
        axios.get('http://localhost:5000/api/forum/posts').then((res) => {
            if (res.data.success) setNewsPosts(res.data.data);
        });
    }, []);

    
    return (
        <div className="news-alerts-page">
            <h2 className="page-title">News and Alerts</h2>
    
            {/* Risky Entities */}
            <div className="risky-entities">
                <h3 className="section-title">Risky Entities</h3>
                <table className="risk-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Risk Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riskyEntities.map((entity, index) => (
                            <tr key={index}>
                                <td>{entity.type}</td>
                                <td>{entity.value}</td>
                                <td>{entity.risk_score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            {/* News Posts */}
            <div className="news-posts">
                <h3 className="section-title">Latest News</h3>
                <ul className="news-list">
                    {newsPosts.map((post) => (
                        <li key={post.post_id} className="news-item">
                            <h4 className="news-title">{post.title} <span className="news-author">(by {post.user})</span></h4>
                            <p className="news-content">{post.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
    
};

export default NewsPage;
