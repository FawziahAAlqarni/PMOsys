# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack Portfolio Task Management application with CRUD operations for managing portfolio tasks across three
portfolios (HA, MA, EA). Monorepo structure with separate frontend and backend.

## project context
This explains what this project is supposed to do when completed.

Plan:
Our project management system is going to be built by our PMO. the system doesn't care about project tasks progress,
as it is handled by MS Project. But rather it cares about the other processes, as will be detailed below.

PMO team are:
- Planning
- Governance, Risk, Control (GRC)
- Business solutions, our team that is building the app.

We already have a hacked together app that does this process. it was built with power apps and power automate, and 
with sharepoint as the DB. so this is why I know all the detailed requirements. and I am working on rebuilding it.


Some entities and restrictions I have:
- the users are from two companies that both use Microsoft & Outlook: our's, which is in the cloud and we will move 
it to on-prem soon, and the ministry which has waaaay more users and already on-prem.
- login will be using Microsoft only.
- permissions and roles will be done by us, not as groups in sharepoint.


The processes from the start of the project to the end are (THIS IS VERY IMPORTANT CONTEXT):

The project manager goes to the guys in the PMO and aligns with them manually on the project card data. automating
this alignment is done in one-to-one settings and is out of the system scope.
  Then after the alignment the project manager creates a project card that has:
- name
- estimated budget
- estimated duration in weeks
- owner (a user)
- program (foreign key)
- portfolio (foreign key)
- description (multi line)
- Learned lessons from previous projects (multi line text)
- dependencies on other projects (multi line text)
- technical committee to oversee the project's outputs (list of users, we just store this info without any interactions 
for them)
- strategic objective of the project (foreign key)
- strategic outcome of the project (foreign key)
- Risks of the project (a list of objects, a one to many, and they are unique for each project) with properties:
 title
 type (enum, risk/challenge)
 description (multi line)
 mitigation plan (multi line)
 category (foreign key)
 sub category (foreign key) (based on the category above, a cat has some sub cats under it)
 type (enum - opportunity/negative)
 response (enum: based on the enum above. both can be also foreign keys)
 stage (enum, planning/execution/closing)
 status (enum, open/closed)
 chance of happening (1-5)
 effect if happens (1-5)
 trigger event (text)
 trigger event date

Then the project card needs approvals. I will build an approvals module to do that later, so it is out of the scope.
and just so you know, it will be calling MS Teams Approvals api, from MS graph api.

the approvals makes sure that this data is actually what they agreed on.

This is considered the first gate of 4 gates. the purpose of these gates is to make sure the project doesn't advance 
to the next stage without governing.

The gates and stages are as follows:
1. STAGE: Initiation
2. GATE: 1 -> output: an approved project card, can start initiation. stage
3. STAGE: detailing
4. GATE: 2 -> output: approval of a general direction of the project, approval of having a contract for it (if 
needed, can be done internally without one), more detailed budgeting and timeline, can start contracting and 
planning with the contractor.
5. STAGE: Planning, then the PM writes the charter and applies to enter gate 3.
6. GATE: 3 -> output: approval of plan, set the kick-off meeting date, charter is ready to collect approvals, 
and can go into execution.
7. STAGE: execution
8. STAGE: closing
9. GATE: 4 -> approval of closing the project.

Initiation (5-10 W days) -> planning (10 W days without contract, 40 W days with contract) -> Execution (depends on 
the charter) -> Closing (depends on the charter)

unlike the PMP methodology, we only fill the charter right before execution.

each project has 4 gates. they have projectId, gateNumber (1-4), status (<something default for gates not submitted 
yet>, pack submitted, pack approved, passed), gateDeadline (used in 1 and 2), isContract (used in 2), submissionPack
(file), and attachements (another file, used in gates 2 and 4)

the first gate is passed by default because it's project card exists.

Applying to gate 1 is setting with PMO staff and out of scope. Applying to other gates is through the system and should
be automated. the project manager fills a PowerPoint template for each gate, and uploads it to the system. the Governance
team approves or rejects this "submission pack". if they approve, it will enter the gating committee and be shown there.
if the committee decides the give the project a pass, the gov team enters the system from there portal and advances the
status of this project's gate to approved.


After gate 2, the direction will be either with contracting or doing in-house.
and in either case, the PM has so start filling out the charter.

the charter has:
- Risks, as detailed above, they just update on it.
- Project high-level scope (multi line).
- number of weeks.
- many other fields, but will fill this later.

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
├── fe/                    # Next.js frontend
│   └── src/app/
│       ├── page.tsx       # Main task management page (client component)
│       └── layout.tsx     # Root layout
├── be/                    # NestJS backend
│   └── src/
│       ├── main.ts        # Entry point, Fastify setup, CORS
│       └── app/
│           ├── app.module.ts              # Root module with TypeORM config
│           └── featuer/                   # feature module
│               ├── feature.controller.ts
│               ├── feature.service.ts
│               ├── entities/              # TypeORM entities
│               └── dto/                   # Input validation DTOs
└── docker-compose.yml     # Multi-container orchestration
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
DB_NAME=project_management
```

### Frontend (fe/.env)

```
WEB_PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:3030/api
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


