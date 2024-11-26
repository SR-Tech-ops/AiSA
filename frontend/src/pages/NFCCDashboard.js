import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartComponent from '../components/ChartComponent';

const NFCCDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [riskScores, setRiskScores] = useState([]);

  useEffect(() => {
    // Fetch Activities
    axios
      .get('https://aisa-qfsr.onrender.com/dashboard/activities')
      .then((response) => setActivities(response.data))
      .catch((error) => console.error('Error fetching activities:', error));

    // Fetch Risk Scores
    axios
      .get('https://aisa-qfsr.onrender.com/dashboard/risk-scores')
      .then((response) => setRiskScores(response.data))
      .catch((error) => console.error('Error fetching risk scores:', error));
  }, []);

  // Prepare Data for Chart
  const chartData = {
    labels: riskScores.map((item) => item.entity_name),
    datasets: [
      {
        label: 'Risk Score',
        data: riskScores.map((item) => item.risk_score),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">NFCC Dashboard</h1>

      <div className="dashboard-content">
        {/* User Activities Section */}
        <div className="dashboard-activities">
          <h2>User Activities</h2>
          <table className="styled-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Action</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.user_id}</td>
                  <td>{activity.action}</td>
                  <td>{activity.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Risk Scores Section */}
        <div className="dashboard-risk-scores">
          <h2>Risky Entities</h2>
          <div className="chart-container">
            <ChartComponent type="bar" data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFCCDashboard;
