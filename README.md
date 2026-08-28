# Career OS

Personal Agentic AI Career OS — a portfolio, learning roadmap, and career dashboard.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Recharts (charts)
- Lucide React (icons)
- React Router (routing)
- IndexedDB (local storage via idb)

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

Push to `main` branch — GitHub Actions will deploy to GitHub Pages automatically.

## Structure

```
src/
├── data/          # Static career data (TypeScript files)
├── types/         # TypeScript interfaces
├── components/    # Reusable UI components
├── pages/         # Route pages
├── lib/           # Utilities, storage, calculations
├── hooks/         # Custom React hooks
├── services/      # External service integrations
└── content/       # Markdown articles
```

## Data

All public portfolio data lives in `src/data/`. Edit these files to update your portfolio.

Private dashboard data is stored in IndexedDB (browser local storage).

## Export/Import

Use the Dashboard → Export/Import buttons to backup and restore your local tracking data.
