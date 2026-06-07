# Aura Grand Hotel - Full Stack Reservation System

Lüks otel rezervasiya platforması - müasir və rahat qonaq təcrübəsi üçün hazırlanmışdır.

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- Vite

**Backend:**
- Node.js
- Express
- MongoDB
- JWT Authentication
- Multer (file upload)
- Cloudinary (image storage)
- Nodemailer (email)

## Project Structure

```
Final-Layihe/
├── frontend/          # React frontend
├── backend/           # Express backend
└── README.md          # This file
```

## Installation

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure .env with your settings
npm run seed:admin  # Create admin user
npm run dev          # Development mode
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Configure .env with backend URL
npm run dev          # Development mode
```

## Running in Production

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## Features

- Hotel and room browsing with filters
- Online reservation system
- User authentication (login/register)
- Wishlist functionality
- Reviews and ratings
- Dark/Light mode toggle
- Gallery with lightbox
- Blog and FAQ sections
- Contact form with email notifications
- Admin panel (accessible via /admin)
- Real-time data updates (30s polling)

## API Endpoints

All API endpoints are prefixed with `/api`:

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

## API Documentation

Swagger UI available at `http://localhost:5000/api/docs`

## Admin Panel

Admin panel is accessible via direct URL: `http://localhost:5173/admin`

Default admin credentials (after seeding):
- Email: admin@example.com
- Password: Admin@1234

## Environment Variables

See `.env.example` files in both frontend and backend directories for required environment variables.

## License

ISC