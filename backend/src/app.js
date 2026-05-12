const express = require('express');
const cors = require('cors');
const logger = require('./middleware/loggerMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');

const app = express();

// Standart Middleware-lər
app.use(cors());
app.use(express.json());
app.use(logger); // Hər bir müraciəti terminalda göstərir

// --- ƏLAVƏ EDİLDİ: Brauzerdə görmək üçün test route-ları ---

// 1. Ana Səhifə (http://localhost:5000/)
app.get('/', (req, res) => {
    res.status(200).send('<h1>Aura Grand Hotel API işləyir...</h1><p>API-dan istifadə etmək üçün <b>/api/hotels</b> ünvanına gedin.</p>');
});

// 2. API Haqqında Ümumi Məlumat (http://localhost:5000/api)
app.get('/api', (req, res) => {
    res.json({
        project: "Aura Grand Hotel",
        version: "1.0.0",
        status: "Active",
        endpoints: ["/api/auth", "/api/hotels", "/api/reservations"]
    });
});

// ---------------------------------------------------------

// Marşrutlar (Routes)
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);

// Əgər səhv ünvan yazılarsa (404 Error Handler)
app.use((req, res, next) => {
    res.status(404);
    next(new Error(`Tapılmadı - ${req.originalUrl}`));
});

// Global Error Handler (Xətaları tutub JSON formatında qaytarır)
app.use(errorHandler);

module.exports = app;