const express = require('express');
const cors = require('cors');
const logger = require('./middleware/loggerMiddleware'); // 
const { errorHandler } = require('./middleware/errorMiddleware'); // 

const app = express();

// Standart Middleware
app.use(cors());
app.use(express.json());
app.use(logger); // Hər bir istəyi log edir 

// Test Route
app.get('/', (req, res) => {
    res.send('Aura Grand Hotel API Hazırdır!');
});

// Global Error Handler (Həmişə route-lardan sonra gəlməlidir)
app.use(errorHandler); // 

module.exports = app;