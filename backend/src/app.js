const express = require('express');
const cors = require('cors');
const logger = require('./middleware/loggerMiddleware'); // 
const { errorHandler } = require('./middleware/errorMiddleware'); // 
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger); // Bütün istəkləri konsolda göstərir 

// API Yolları 
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);

// Əgər heç bir route tapılmazsa (404)
app.use((req, res, next) => {
    res.status(404);
    next(new Error(`Tapılmadı - ${req.originalUrl}`));
});

// Global Error Handler 
app.use(errorHandler);

module.exports = app;