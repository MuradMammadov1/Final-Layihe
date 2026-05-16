const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./middleware/loggerMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');

// Route-ların importu
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const roomRoutes = require('./routes/roomRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

// --- Middleware-lər ---
app.use(cors());
// JSON və Form məlumatlarını oxumaq üçün (Tam həcmli)
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(logger);

// Statik fayllar (Şəkillər üçün)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --- 1. ANA SƏHİFƏ (Vizual Dizayn) ---
app.get('/', (req, res) => {
    res.status(200).send(`
        <div style="font-family: sans-serif; padding: 40px; text-align: center; background-color: #f4f7f6; min-height: 80vh;">
            <h1 style="color: #2c3e50; font-size: 3rem;">🏨 Aura Grand Hotel</h1>
            <p style="color: #27ae60; font-size: 1.2rem; font-weight: bold;">Backend Server Aktivdir</p>
            <hr style="width: 50%; margin: 20px auto;">
            <p style="color: #7f8c8d;">API detalları üçün <a style="color: #3498db; text-decoration: none;" href="/api">/api</a> ünvanına keçin.</p>
        </div>
    `);
});

// --- 2. API DETALLARI (Genişləndirilmiş CRUD siyahısı ilə) ---
app.get('/api', (req, res) => {
    res.json({
        project: "Aura Grand Hotel",
        status: "Active",
        author: "Murad Məmmədov",
        endpoints: {
            auth: ["POST /api/auth/register", "POST /api/auth/login", "GET /api/auth/me (Protect)", "PUT /api/auth/me (Protect)", "POST /register", "POST /login"],
            hotels: [
                "GET /api/hotels", 
                "GET /api/hotels/:id", 
                "POST /api/hotels (Admin)",
                "PUT /api/hotels/:id (Admin)",
                "DELETE /api/hotels/:id (Admin)",
                "GET /api/hotels/:id?startDate=...&endDate=..."
            ],
            rooms: [
                "POST /api/rooms (Admin)",
                "GET /api/rooms/:id",
                "PUT /api/rooms/:id (Admin)",
                "DELETE /api/rooms/:id (Admin)",
                "GET /api/rooms/hotel/:hotelId"
            ],
            reservations: [
                "POST /api/reservation (Protect)",
                "GET /api/reservation/user (Protect)",
                "GET /api/reservation/:id (Protect)",
                "GET /api/reservation/all (Admin)",
                "PUT /api/reservation/status (Admin)",
                "DELETE /api/reservation/:id (Protect)"
            ],
            reviews: [
                "POST /api/review (Protect)", 
                "GET /api/review/:hotelId",
                "PUT /api/review/:id (Protect)",
                "DELETE /api/review/:id (Protect)"
            ],
            wishlist: [
                "GET /api/wishlist (Protect)",
                "POST /api/wishlist/:hotelId (Protect)",
                "DELETE /api/wishlist/:hotelId (Protect)"
            ]
        }
    });
});

// --- 3. MARŞRUTLARIN QOŞULMASI ---
app.use('/api/auth', authRoutes);
app.use('/', authRoutes); // /register və /login üçün alias
app.use('/api/hotels', hotelRoutes);
app.use('/hotels', hotelRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/reservation', reservationRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/review', reviewRoutes);
app.use('/review', reviewRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/rooms', roomRoutes);

// API docs (Swagger)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- 4. XƏTA İDARƏETMƏSİ ---
app.use((req, res, next) => {
    res.status(404);
    next(new Error(`Tapılmadı - ${req.originalUrl}`));
});

app.use(errorHandler);

module.exports = app;