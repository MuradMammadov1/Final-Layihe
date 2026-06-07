# Aura Grand Hotel Backend

Backend API for Aura Grand Hotel reservation system.

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
MONGO_URI=mongodb://localhost:27017/hotel_db
JWT_SECRET=your_jwt_secret_here
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=you@example.com
EMAIL_PASS=your_email_password
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@1234
ADMIN_NAME=Admin
PORT=5000
NODE_ENV=development
```

## Running

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

- `/api/auth` - Authentication
- `/api/hotels` - Hotels management
- `/api/rooms` - Rooms management
- `/api/reservation` - Reservations
- `/api/review` - Reviews
- `/api/wishlist` - Wishlist
- `/api/services` - Services
- `/api/faq` - FAQ
- `/api/special-offers` - Special offers
- `/api/blog` - Blog posts
- `/api/about` - About page
- `/api/testimonials` - Testimonials
- `/api/gallery` - Gallery
- `/api/newsletter` - Newsletter
- `/api/stats` - Statistics
- `/api/contact` - Contact form

## Database Seeding

```bash
npm run seed:admin
```

## API Documentation

Swagger UI available at `/api/docs`
