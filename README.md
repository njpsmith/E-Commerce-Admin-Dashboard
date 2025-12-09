# E-Commerce Admin Dashboard

_A modern, scalable, production-quality admin dashboard built with React, TypeScript, and a feature-based architecture._

---

## Overview

This project is a full-featured **E-Commerce Admin Dashboard**, including:

- Scalable architecture
- Strong TypeScript discipline
- Feature-driven folder structure
- React Query for server-state management
- Authentication + Role-based access
- CRUD operations for products, customers, and orders
- Playwright E2E testing
- Modern UI using TailwindCSS
- Realistic API mocking with MSW
- CI/CD workflows and documentation

It is built with patterns and practices used in real production environments.

---

## Live Demo

**Demo:** _Coming soon_

### Login Credentials

**Admin**

- Email: `admin@example.com`
- Password: `admin123`

**Staff**

- Email: `staff@example.com`
- Password: `staff123`

---

## Tech Stack

- **React 19 (TypeScript)**
- **Vite** (bundler)
- **React Router** (routing)
- **React Query (TanStack)** (API caching & async state)
- **Context API** (auth, theme, global config)
- **TailwindCSS** (styling)
- **Zod** (schema validation)
- **MSW** (mock API for local dev and testing)
- **Jest + React Testing Library** (unit & integration tests)
- **Playwright** (end-to-end tests)
- **GitHub Actions** (CI/CD)

---

## Project Structure

```txt
src/
 ├─ app/
 │   ├─ providers/
 │   ├─ routes/
 │   ├─ hooks/
 │   └─ layout/
 │
 ├─ features/
 │   ├─ auth/
 │   ├─ products/
 │   ├─ customers/
 │   ├─ orders/
 │   └─ dashboard/
 │
 ├─ components/        # Reusable UI components
 ├─ lib/               # Utilities, API clients, helpers
 ├─ tests/             # Global test utils
 └─ main.tsx
```

## Key Features

### Authentication

- Login/logout
- JWT-based session (mocked with MSW)
- Role-based access control (Admin vs Staff)
- Protected routes

### Products

- Products list with pagination, sorting, filtering
- Create / Edit / Delete product
- Image upload
- Optimistic UI updates
- Zod-powered form validation

### Customers

- Customer list with search
- Customer detail view (profile, order history)

### Orders

- Orders list with status filters
- Update order status (optimistic updates + rollback on error)

### Dashboard

- Revenue charts
- KPIs
- Top-selling products
- Customer growth analytics

### UI/UX

- TailwindCSS styling
- Responsive design
- Dark mode
- Skeleton loaders
- Error boundaries

## Testing

**Unit & Integration (Jest + RTL)**

- Tests for hooks
- Tests for services
- Tests for validation schemas
- Component tests

**E2E (Playwright)**

- Login flow
- Product CRUD
- Customer search
- Order status updates

**Mocking**

All API traffic is handled with MSW, enabling consistent test environments and repeatable scenarios.

## Architecture Decisions

### React Query for Server State

Selected because it:

- Handles caching, revalidation, retries, and stale state
- Reduces global state management needs
- Aligns with modern React application patterns

### Context API for Client State

Used for:

- Authentication
- Theme management
- App-wide config

### Feature-Based File Structure

Promotes:

- Encapsulation
- Maintainability
- Scalability

### Zod for Validation

Ensures:

- Runtime safety
- Type inference
- Clean, maintainable schemas

## Local Development

1. Install dependencies
   `npm install`

2. Start development server
   `npm run dev`

3. Run tests
   `npm test`

4. Run Playwright E2E tests
   `npx playwright test`

5. Build for production
   `npm run build`

## CI/CD

GitHub Actions pipeline includes:

- Linting
- Type checking
- Unit tests
- E2E tests
- Build step verification

All PRs must pass before merging.

## Roadmap

- Order shipping labels
- Product categories management
- User management module
- Stripe webhook simulation
- Multi-language support
- Realtime updates via WebSockets

## Screenshots

Add screenshots or GIFs after deployment.
(Use Vercel/Netlify preview images)

## License

MIT — free to use, modify, and distribute.

## Credits

Built by Nicholas Smith — Frontend Developer.
Designed to showcase scalable frontend engineering, architecture, and testing expertise.

---
