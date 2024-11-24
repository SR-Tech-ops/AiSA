const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Enable CORS globally
app.use(express.json()); // Parse incoming JSON requests

// Importing routes
const dashboardRoutes = require('./routes/dashboard'); // Adjust the path as needed
const verificationRoutes = require('./routes/verification'); // Ensure correct path
const forumRoutes1 = require('./routes/forumRoutes'); // Import forum routes
const forumRoutes2 = require('./routes/forum'); // Importing the forum route
const newsRoutes = require('./routes/newsRoutes'); // Importing the forum route
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const cpanelroutes = require("./routes/cpanelroutes");

// Register Routes
app.use('/dashboard', dashboardRoutes);
app.use('/api', verificationRoutes);
app.use('/api', forumRoutes1); // Add forum routes here
app.use('/api/forum', forumRoutes2);
app.use('/api/news', newsRoutes);
app.use('/api', authRoutes);
app.use('/api', ticketRoutes);
app.use("/api", cpanelroutes);


// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
