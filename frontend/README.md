# Frontend - Aura Grand Hotel

Run locally:

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_API_URL=http://localhost:5000
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Features

- Hotel and room browsing
- Online reservation system
- User authentication (login/register)
- Wishlist functionality
- Reviews and ratings
- Dark/Light mode toggle
- Gallery with lightbox
- Blog and FAQ sections
- Contact form
- Admin panel (accessible via /admin)

## Notes

- The frontend expects the backend API under `/api`. When running both on the same machine, use a proxy or run backend on port 5000 and frontend will call `/api/...`.
- Authentication token is stored in `localStorage` under `token` key.
- Tailwind was intentionally not installed to avoid registry version issues; simple CSS fallback is used. If you want Tailwind, install `tailwindcss`, `postcss`, and `autoprefixer`, and restore `postcss.config.cjs` and `tailwind.config.cjs`.
- All pages use polling (30s interval) to fetch fresh data from backend.

