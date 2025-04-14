# Finesse Med-Store (Frontend)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <!-- Example Badge -->
[![Vercel Deployment](https://therealsujitk-vercel-badge.vercel.app/?app=finesse-store&style=for-the-badge)](https://finesse-store.vercel.app/) <!-- Example - Replace with your actual deployment badge if available -->

This repository contains the frontend application for Finesse Med-Store, a modern e-commerce platform built with Next.js and TypeScript. It serves as the primary user interface for customers, interacting with a separate headless backend/admin application (`medstore-admin`) to fetch data and manage state.

---

## Table of Contents

1.  [Project Purpose](#project-purpose)
2.  [Key Features](#key-features)
3.  [Tech Stack](#tech-stack)
4.  [Architecture Overview](#architecture-overview)
5.  [Project Structure](#project-structure)
6.  [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
7.  [Environment Variables](#environment-variables)
8.  [Running the Application](#running-the-application)
    - [Development](#development)
    - [Build](#build)
9.  [Deployment](#deployment)
10. [Areas for Improvement](#areas-for-improvement--contribution)
11. [License](#license)

---

## Project Purpose

The goal of this project is to provide a fast, responsive, and user-friendly online shopping experience for Finesse Med-Store customers. It handles product discovery (browsing, searching, filtering), product viewing, and cart management, leveraging modern web technologies for optimal performance and developer experience.

---

## Key Features

- **Next.js App Router:** Utilizes Server Components, Client Components, and file-system based routing for a modern architecture.
- **Product Catalog Display:** Fetches and displays products from the backend API.
- **Dynamic Category Filtering:** Allows users to browse products by category, with dedicated pages for each collection.
- **Product Detail Pages:** Provides comprehensive information for individual products.
- **Search Functionality:** Includes routes and UI components for searching products.
- **Interactive Shopping Cart:** Client-side cart management with add, remove, and quantity adjustment features.
- **Headless Architecture:** Decoupled from the backend (`medstore-admin`), communicating via a defined API.
- **TypeScript:** Ensures type safety across the codebase.
- **Tailwind CSS:** Provides utility-first styling for rapid UI development.
- **Data Caching & Revalidation:** Implements strategies (e.g., On-Demand ISR with tags) to balance performance and data freshness.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **API Communication:** Native Fetch API
- **Data Fetching Strategy:** Centralized asynchronous functions in `/actions`
- **State Management:** React Hooks (useState, useContext, useReducer), potentially React Context API.
- **Authentication Integration:** Relies on backend (`medstore-admin`) which likely uses Clerk.
- **UI Components:** Built using standard React components, potentially enhanced by libraries like `clsx` for conditional classes.
- **Deployment:** [Vercel](https://vercel.com/) 

---

## Architecture Overview

- **Frontend (`finesse-store` - this repo):** Renders the UI, handles user interactions and client-side state (cart), fetches data from the backend API via `/actions`. Uses Server Components for data-fetching closer to the source and Client Components for interactivity.
- **Backend (`medstore-admin` - separate repo):** Headless CMS/API managing database interactions (Prisma), providing API endpoints (`/categories`, `/inventories`, etc.), handling business logic, and authentication (Clerk).
- **Data Flow:** Frontend components -> `/actions` functions -> `fetch` -> `medstore-admin` API endpoints -> Database.
- **Caching:** Employs Next.js Data Cache with strategies like tag-based On-Demand Revalidation. The backend triggers revalidation on the frontend via a dedicated, secured API endpoint (`/api/revalidate`) after data mutations.

---

## Project Structure

```
finesse-store/
├── app/                      # Next.js App Router directory
│   ├── (routes)/             # Grouped application routes
│   │   ├── page.tsx          # Home page
│   │   ├── product/[handle]/ # Product detail page route
│   │   └── search/           # Search and category pages
│   │       ├── [collection]/ # Dynamic category page route
│   │       ├── layout.tsx    # Layout specific to search/category
│   │       └── page.tsx      # Main search results page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── ...
├── actions/                  # Data fetching functions (API calls)
├── components/               # Reusable UI components (Client & Server)
│   ├── cart/                 # Cart related components
│   ├── layout/               # Layout components (Navbar, Footer, Search Filters)
│   ├── products/             # Product specific display components
│   ├── ui/                   # Generic UI elements (buttons, inputs etc. - if used)
│   └── ...
├── lib/                      # Utility functions, constants, types
├── provider/                 # Client-side context providers (e.g., Toast)
├── public/                   # Static assets (images, fonts, etc.)
├── types/                    # TypeScript type definitions (e.g., Product, Category)
├── .env.local                # Local environment variables (Gitignored)
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies and scripts
├── README.md                 # This file
└── tsconfig.json             # TypeScript configuration
```

**Next Steps:**

1.  **Review and Edit:** Read through the generated README. Adjust any assumptions (like Tailwind CSS, deployment platform, license) to match your actual project setup. Fill in placeholder details like the specific Node.js version if required.
2.  **Add `LICENSE.md`:** If you don't have one, create a `LICENSE.md` file and add the contents of the MIT license (or your chosen license).
3.  **Commit:** Add the updated `README.md` (and potentially `LICENSE.md`) to your Git repository.

---

## Getting Started

Follow these instructions to set up and run the project locally for development.

### Prerequisites

- [Node.js](https://nodejs.org/) (Version 18.x or later recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/) package manager
- Access to a running instance of the `medstore-admin` backend API.
- Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd finesse-store
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory by copying the example file (if one exists) or creating it manually. See the [Environment Variables](#environment-variables) section below for required values.

---

## Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```dotenv
# URL pointing to your running medstore-admin backend API (including storeId)
NEXT_PUBLIC_API_URL=http://localhost:3001/api/<your-store-id> # Example for local backend
# NEXT_PUBLIC_API_URL=https://medstore-admin.vercel.app/api/<your-store-id> # Example for deployed backend

# Secret token used to secure the /api/revalidate endpoint (must match the one used by the backend trigger)
REVALIDATION_SECRET=YOUR_SECURE_RANDOM_SECRET_STRING

# Add any other required variables below (e.g., Clerk Public Key if needed)
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_*************************
```

- `NEXT_PUBLIC_API_URL`: Essential for fetching data from the backend. Ensure it points to the correct URL (including the specific `/api/[storeId]` path) of your running `medstore-admin` instance.
- `REVALIDATION_SECRET`: Required if using On-Demand Revalidation. This secures the `/api/revalidate` endpoint in this frontend application. It must match the secret used by the `medstore-admin` backend when it calls this frontend's revalidation endpoint.

---

## Running the Application

### Development

To run the development server with hot-reloading:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (or the specified port) in your browser.

### Build

To create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server (Locally)

To run the production build locally (after running `build`):

```bash
npm start
# or
yarn start
# or
pnpm start
```

---

## Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/), the creators of Next.js.

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into Vercel.
3.  Configure the **Environment Variables** (`NEXT_PUBLIC_API_URL`, `REVALIDATION_SECRET`, etc.) in the Vercel project settings.
4.  Vercel will automatically build and deploy the application.

---

## Areas for Improvement & Contribution

This project offers several opportunities for enhancement and optimization:

1.  **Caching Strategy Refinement:** Optimize `fetch` caching options in `/actions`.
2.  **Error Handling & User Feedback:** Improve API error handling and UI feedback (e.g., Toasts).
3.  **State Management:** Evaluate client-side state management needs as complexity grows.
4.  **Testing:** Implement unit, integration, and/or e2e tests.
5.  **Component Refactoring & UI/UX:** Improve component reusability, loading states, and accessibility.
6.  **Search Implementation:** Enhance search features (debouncing, advanced filters).
7.  **Performance Optimization:** Analyze bundle sizes, optimize images, fine-tune rendering.
8.  **Type Safety:** Ensure robust typing, especially for API data.

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details (assuming MIT - create a LICENSE.md file if needed).
