# Frontend - Aura Grand Hotel

Run locally:

```bash
cd frontend
npm install
npm run dev
```

Notes:
- The frontend expects the backend API under `/api`. When running both on the same machine, use a proxy or run backend on port 5000 and frontend will call `/api/...`.
- Authentication token is stored in `localStorage` under `token` key.
- Tailwind was intentionally not installed to avoid registry version issues; simple CSS fallback is used. If you want Tailwind, install `tailwindcss`, `postcss`, and `autoprefixer`, and restore `postcss.config.cjs` and `tailwind.config.cjs`.
