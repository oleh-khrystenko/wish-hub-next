# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wish Hub — a Next.js 14 (App Router) frontend for a wish-sharing platform. Ukrainian-first SaaS with i18n support (uk, en, ru). No local database — communicates with a backend API via Axios. Uses JWT auth with token refresh and CryptoJS password encryption.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint check
npm run format    # Prettier format all files
```

## Architecture

### Routing

All routes are under `src/app/[locale]/`. The `[locale]` param (`ua`, `en`, `ru`) is enforced by `src/middleware.ts` using next-intl. Key routes:
- `/[locale]/main` — main dashboard
- `/[locale]/auth` — authentication
- `/[locale]/user/[userId]` — user profile (wishes/collections CRUD)
- `/[locale]/user/[userId]/wish/editor` — wish editor
- `/[locale]/[userSlug]` — public profile
- `/[locale]/[userSlug]/[collectionSlug]` — public collection

### State Management

Zustand stores in `src/stores/`, each in its own directory:
- `my-user/` — auth, user profile, friend management
- `wishes/` — wishlist CRUD, filtering, sorting, booking, image upload
- `collection/` — collection CRUD, drag-and-drop reordering
- `users/` — public user profiles, search
- `settings/` — theme (light/dark), UI state, admin stats

### API Layer

`src/helpers/api/settings.ts` defines two Axios instances:
- `baseApi` — unauthenticated requests
- `api` — authenticated, with Bearer token injection and 401 auto-refresh interceptor

Base URL switches via `NEXT_PUBLIC_DEV_API_URL` (dev) / `NEXT_PUBLIC_API_URL` (prod) based on `NODE_ENV`.

### Internationalization

- Config: `src/i18n.ts`, middleware: `src/middleware.ts`
- Translation files: `messages/{en,ua,ru}.json`
- Default locale: `ua` (Ukrainian)
- Use `next-intl` hooks (`useTranslations`, `useLocale`) in components

### Data Models

Defined in `src/models/`:
- `user.ts` — IUser with privacy settings (EPrivacy), friends, stats
- `wish.ts` — IWish with status (BOOKED/UNFULFILLED/FULFILLED), privacy levels, images, booking
- `collection.ts` — ICollection with wishIdList, sorting
- `settings.ts` — ELang, ETheme, EPrivacy, ECurrency (USD/EUR/UAH) enums

### Key Patterns

- **Path alias**: `@/*` maps to `src/*`
- **Custom hooks**: `src/helpers/hooks/` — UseScreenSize (responsive breakpoints), UseValidations (form validation with i18n errors), UseGuestWishes (localStorage wishlist for unauthenticated users)
- **HOCs**: `src/helpers/hocs/` — ServiceWorkerRegistrar for PWA
- **Utils**: `src/helpers/utils/` — encryption, date validation, number formatting, constants (pagination limits, admin IDs)
- **Components**: `src/components/ui/` for UI primitives, `src/components/layouts/` for layout pieces, `src/components/icons/` for SVG icons

## Code Style

- TypeScript strict mode
- Prettier: single quotes, 4-space indent, trailing commas (ES5), semicolons, 80 char print width
- ESLint: max line length 120 chars, tailwindcss plugin for class ordering
- Tailwind dark mode via `class` strategy with custom breakpoints (mobile 360-520px, tablet 600-1180px, desktop 1280-2560px)
- Functional components; `'use client'` directive where needed
- Component files: PascalCase; hooks: PascalCase with `Use` prefix; stores/models: kebab-case

## Environment Variables

- `NEXT_PUBLIC_API_URL` — production API base URL
- `NEXT_PUBLIC_DEV_API_URL` — development API base URL
- `NEXT_PUBLIC_CRYPTO_JS_SECRET` — CryptoJS encryption key
- `NODE_ENV` — switches API base URL

## Images

Remote images served from S3 (`s3.eu-central-1.amazonaws.com/wish.hub/**`). Max upload: 5MB. Allowed: JPG, JPEG, PNG, GIF, WebP.
