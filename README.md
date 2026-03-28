# Wish Hub 🎁

A production-ready SaaS application designed for managing personal wishlists, sharing them with friends, and coordinating gift reservations. This repository serves as a battle-tested frontend foundation demonstrating modular architecture, internationalization (i18n), and responsive UX.

## 🚀 Business Value
- **Seamless User Flow:** Intuitive wish creation with drag-and-drop image uploads, price parsing, and interactive collections.
- **Global Reach:** Deeply integrated internationalization (Next-Intl) supporting multiple languages seamlessly across the platform.
- **Smart Booking System:** Complex UI logic for gift reservations, ensuring privacy controls and preventing duplicate gifting among friends.

## 🏗 Architecture & Tech Stack
Built entirely on modern React ecosystem principles, focusing on strict typing, performance, and modular state management.

### Core Stack
- **Framework:** Next.js (App Router), React, TypeScript.
- **State Management:** Zustand (Modular stores for User, Wishes, Settings, etc.).
- **Styling & UI:** TailwindCSS, Headless UI patterns, Swiper for media galleries.
- **Forms & Validation:** React Hook Form with strict, custom validation pipelines.

## 📁 Repository Structure

    wish-hub-next/
    ├── src/
    │   ├── app/          # Next.js App Router, i18n routing, and page components
    │   ├── components/   # Reusable UI components, icons, and layouts
    │   ├── helpers/      # API integrations (Axios), custom hooks, and utilities
    │   ├── models/       # TypeScript interfaces and domain models
    │   └── stores/       # Zustand modular state management
    ├── messages/         # i18n translation dictionaries (EN, UA, RU)
    └── public/           # Static assets, PWA manifest, and media

## 🛡 Engineering Principles
1. **Modular State Management:** Global state is strictly separated into independent Zustand stores (e.g., `my-user`, `wishes`, `settings`) to prevent unnecessary re-renders and isolate business logic.
2. **Localization First:** i18n is baked directly into the routing and components, ensuring that routing, SEO metadata, and UI elements are fully localized out of the box.
3. **Robust API Handling:** Centralized Axios instances with built-in interceptors for automatic JWT token refreshing, error handling, and language header synchronization.

---
*Built by [CyanShip](https://cyanship.com) — Launch your B2B platform faster.*
