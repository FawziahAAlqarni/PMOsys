# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack Portfolio Task Management application with CRUD operations for managing portfolio tasks across three portfolios (HA, MA, EA). Monorepo structure with separate frontend and backend.

## Development Commands

### Frontend (fe/)

```bash
cd fe
npm run dev          # Dev server at http://localhost:8008
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend (be/)

```bash
cd be
npm run start:dev    # Watch mode with auto-reload
npm run start:debug  # Debug mode with inspector
npm run build        # Compile TypeScript
npm run start:prod   # Production mode (node dist/main)
npm run test         # Jest unit tests
npm run test:watch   # Test watch mode
npm run test:cov     # Test coverage report
npm run test:e2e     # E2E tests
npm run lint         # ESLint with auto-fix
npm run format       # Prettier formatting
```

### Docker

```bash
docker-compose up -d              # Start all services (fe, be, postgres)
docker-compose up -d postgres     # Start only database
docker-compose down               # Stop all services
```

## Architecture

### Tech Stack

- **Frontend:** Next.js 16, React 19 (with React Compiler), TypeScript, Tailwind CSS v4
- **Backend:** NestJS 11 with Fastify adapter, TypeORM 11, PostgreSQL 18
- **Infrastructure:** Docker Compose, node:24-alpine

### Project Structure

```
├── fe/                    # Next.js frontend (port 8008)
│   └── src/app/
│       ├── page.tsx       # Main task management page (client component)
│       └── layout.tsx     # Root layout
├── be/                    # NestJS backend (port 3000)
│   └── src/
│       ├── main.ts        # Entry point, Fastify setup, CORS
│       └── app/
│           ├── app.module.ts              # Root module with TypeORM config
│           └── portfolio-task/            # Core feature module
│               ├── portfolio-task.controller.ts
│               ├── portfolio-task.service.ts
│               ├── entities/              # TypeORM entities
│               └── dto/                   # Input validation DTOs
└── docker-compose.yml     # Multi-container orchestration
```

### API Endpoints

Base URL: `/api/portfolio-tasks`

| Method | Endpoint              | Description                                |
|--------|-----------------------|--------------------------------------------|
| POST   | `/`                   | Create task                                |
| GET    | `/`                   | List all (optional `?portfolio=HA` filter) |
| GET    | `/:id`                | Get by UUID                                |
| GET    | `/by-task-id/:taskId` | Get by taskId (e.g., "HA_1")               |
| PATCH  | `/:id`                | Update task                                |
| DELETE | `/:id`                | Delete task                                |

### Database Schema

```typescript
// PortfolioTask entity
interface PortfolioTask {
  id: string;                      // UUID primary key
  portfolioName: 'HA' | 'MA' | 'EA';
  taskName: string;
  taskId: string;                  // Unique, format "PORTFOLIO_NUMBER" (e.g., "HA_1")
  dueDate: Date;
  completionPercentage: number;    // 0-100, default 0
  createdAt: Date;
  updatedAt: Date;
}

// PortfolioCounter entity (auto-incrementing taskId generation)
interface PortfolioCounter {
  portfolio: Portfolio;            // Primary key
  counter: number;
}
```

### Key Patterns

**Backend:** NestJS feature module pattern with DTOs for validation, service layer for business logic, pessimistic locking for counter updates.

**Frontend:** Client component with React hooks (useState, useMemo, useEffect), direct fetch to API, Thursday-based week selection.

**Path Aliases:** Frontend uses `@/*` to import from `src/*`.

## Environment Variables

### Root (.env)

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=basem_task_management
```

### Frontend (fe/.env)

```
WEB_PORT=8008
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Backend (be/.env)

```
API_PORT=3030
```

## Configuration Notes

- React Compiler enabled in `next.config.ts`
- Tailwind v4 uses `@import 'tailwindcss'` syntax
- TypeORM auto-sync enabled in development
- Backend CORS is environment-aware
- Docker uses non-root users (nextjs:1001, nestjs:1001)
