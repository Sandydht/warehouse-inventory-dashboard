# Warehouse Inventory Dashboard

This project is a Warehouse Inventory Dashboard system that supports inventory management with an approval workflow.

The system allows users to create inventory requests, and officers can approve or reject those requests before changes are committed into the inventory.

---

## Tech Stack

- React + TypeScript (Vite)
- Redux Toolkit (State Management)
- IndexedDB (Local Persistence)
- MSW (Mock Service Worker) for API Simulation
- TailwindCSS (UI Styling)

---

## How to Run the Project

### 1. Clone Repository

```bash
git clone https://github.com/Sandydht/warehouse-inventory-dashboard.git

cd warehouse-inventory-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

---

## Architectural Decisions

This project follows a Clean Architecture + Domain-Driven Design (DDD) approach. The codebase is separated into 4 main layers:

### 1. Domain Layer (`src/domain`)

Contains core business entities and rules:

- ApprovalRequest entity
- InventoryItem entity
- User roles and business validation

Domain layer has no dependency on UI or infrastructure.

### 2. Application Layer (`src/application`)

Contains use cases that orchestrate business workflows:

- Create Approval Request
- Approve / Reject Request
- Commit approved changes into Inventory

This layer acts as the bridge between domain logic and infrastructure.

### 3. Infrastructure Layer (`src/infrastructure`)

Handles external implementations such as:

- IndexedDB repositories
- MSW mock API handlers
- DTO mapping between layers

This layer can later be replaced with a real backend API without changing domain logic.

### 4. Presentation Layer (`src/presentation`)

Contains UI implementation:

- React Pages and Components
- Redux Store
- Routing and Hooks

UI layer communicates only through application use cases.

---

## Assumptions Made During Development

- The system uses 2 main roles:
  - STAFF → Creates approval requests
  - OFFICER → Approves or rejects requests
- No real backend service is used. All APIs are simulated using MSW.
- Inventory data persistence is handled locally using IndexedDB.
- Approval workflow supports statuses:
  - PENDING
  - APPROVED
  - REJECTED
