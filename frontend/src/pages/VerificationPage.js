import React, { useState } from 'react';
import axios from 'axios';
import VerificationPopNote from './VerificationPopNote';

const VerificationPage = () => {
    const [verificationType, setVerificationType] = useState('business'); // Default: Business
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null); // Holds the API response
    const [status, setStatus] = useState(''); // 'loading', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const details = [
        { business: "Eagle Aeronautics (M) Sdn Bhd (796603-A)", phone: "4411223344", account: "9988776655" },
        { business: "Future Trade Indojaya Sdn Bhd (1003327-P)", phone: "9911223344", account: "2211334455" },
        { business: "Greenmillion Agrosolution Enterprise", phone: "4411223344", account: "9988776655" },
        { business: "Royal Gold Sdn Bhd (1005830-X)", phone: "7788991122", account: "5566778899" },
        { business: "Urustabil Sdn Bhd (545426-X)", phone: "7788991122", account: "1231231231" },
        { business: "JTGold", phone: "7788991122", account: "6655443322" },
        { business: "Iconhill Holding Sdn Bhd (810775-P)", phone: "7788991122", account: "9911223344" },
        { business: "Isothree Gold Sdn Bhd (906561-K)", phone: "3322114455", account: "6655443322" },
        { business: "Instaforex", phone: "3322114455", account: "6655443322" },
        { business: "RealFX", phone: "9911223344", account: "2211334455" },
        { business: "Prime Global Vision", phone: "9911223344", account: "1231231231" },
        { business: "Public Golden House Sdn Bhd (806825-M)", phone: "3322334455", account: "2211334455" },
        { business: "Softlux Sdn Bhd", phone: "3322334455", account: "9988776655" }
    ];

    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');
        setResult(null); // Reset result on new request

        try {
            const response = await axios.post('http://localhost:5000/api/verify', {
                type: verificationType,
                value: inputValue,
            });

            if (response.data.success) {
                setStatus('success');
                setResult([response.data.data]); // Wrap single object in an array for mapping
            } else {
                setStatus('error');
                setErrorMessage(response.data.message || 'Verification failed. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage(
                error.response?.data?.message || 'An error occurred while verifying. Please try again later.'
            );
        }
    };

    const handleVerify = (account) => {
        alert(`Redirecting to verification portal for account: ${account}`);
        // Add logic to redirect to the verification portal with the account number
        window.location.href = `/verification?account=${account}`;
    };

    return (
        <div className="verification-page">
            <h2>Verification Portal</h2>
            <VerificationPopNote details={details} onVerify={handleVerify} />
    
            <form onSubmit={handleVerificationSubmit}>
                {/* Verification Type (Business/Phone/Bank) */}
                <div>
                    <label>Choose verification type:</label>
                    <select
                        value={verificationType}
                        onChange={(e) => setVerificationType(e.target.value)}
                    >
                        <option value="business">Business</option>
                        <option value="phone">Phone Number</option>
                        <option value="account">Bank Account</option>
                    </select>
                </div>
    
                {/* Input Field for the Verification Value */}
                <div>
                    <label>Enter {verificationType}</label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        required
                        placeholder={`Enter ${verificationType} details`}
                    />
                </div>
    
                {/* Submit Button */}
                <button type="submit">Verify</button>
            </form>
    
            {/* Loading or Result Display */}
            {status === 'loading' && <p>Verifying...</p>}
            {status === 'error' && <p style={{ color: 'red' }}>{errorMessage}</p>}
    
            {status === 'success' && result && (
                <div>
                    <h3>Verification Result:</h3>
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Value</th>
                                <th>Entity Name</th>
                                <th>Match Score</th>
                                <th>Frequency Score</th>
                                <th>Complaint Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((item, index) => (
                                <tr key={index}>
                                    <td>{verificationType}</td>
                                    <td>{inputValue}</td>
                                    <td>{item.entity_name || 'N/A'}</td>
                                    <td>{item.match_score || 'N/A'}</td>
                                    <td>{item.frequency_score || 'N/A'}</td>
                                    <td>{item.complaint_count || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );    
};

export default VerificationPage;
