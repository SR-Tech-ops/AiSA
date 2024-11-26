// frontend/src/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('https://aisa-qfsr.onrender.com/api/signup', { name, password });
        console.log(response.data);
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
