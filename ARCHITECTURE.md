# Architecture

## Static-First Design

This is a static site deployed on GitHub Pages. No server-side backend.

```
GitHub Pages (static hosting)
    ↓
React SPA (client-side routing)
    ↓
IndexedDB (local private data)
```

## Data Flow

```
src/data/*.ts  →  Components  →  Rendered HTML
     ↓
  TypeScript types ensure data integrity
```

Public data: Committed to Git repository as TypeScript files.
Private data: Stored in browser via IndexedDB.

## Authentication

GitHub OAuth via external provider. No custom auth server.
Session stored in browser. Not equivalent to server-side security.

## Local Storage

```
StorageProvider (interface)
    ├── LocalStorageProvider
    └── IndexedDBProvider (default)
```

All private dashboard data (daily logs, weekly reviews, goals) stored in IndexedDB.

## AI Provider Abstraction

```
AIProvider (interface)
    ├── OpenAIProvider
    ├── AnthropicProvider
    └── MockProvider (fallback)
```

UI works without AI API key configured.

## Security Limitations

- No server-side session management
- Browser storage is not secure storage
- API keys must not be committed to repository
- Client-side auth does not provide server-level security
