# 🛒 বাজার দর (BazarDor)

> **Real-Time Essential Market Price Tracking & Comparison Web Application in Bangladesh**  
> Designed and built with a modern, high-performance tech stack.

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-058240?style=flat-square&logo=security&logoColor=white)](https://better-auth.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 🌟 Overview

**Bazar Dor** is a robust, responsive web platform designed to monitor and track daily essential commodity prices across various markets in Bangladesh. It bridges the information gap for everyday consumers by providing up-to-date pricing trends, market fluctuations, and detailed statistical insights.

---

## 🚀 Key Features

1. **Live Price Ticker Marquee**  
   * Displays continuous real-time scrolling updates for trending essential items, highlighting daily price changes with directional trend indicators (`▲` / `▼`).
2. **Dynamic Market Categorization & Grids**  
   * Structured home layout featuring specialized sections such as **Top Price Risers**, **Top Price Fallers**, and a comprehensive searchable catalog of all market goods.
3. **Advanced Market-Wise Price Comparison (`/product/[slug]`)**  
   * In-depth analytical views for individual products showcasing minimum, maximum, and average prices alongside specific market vendor breakdowns.
4. **Secure Multi-Provider Authentication**  
   * Powered by **Better Auth** supporting secure credential logins (Email/Password) as well as seamless Social OAuth integrations (Google & GitHub) with session state management.
5. **Smart Sorting & Responsive Architecture**  
   * Fully mobile-optimized user interface built with Tailwind CSS, featuring efficient local state filtering, sorting utilities, and clean component-driven design patterns.

---

## 🛠️ Tech Stack

* **Core Framework:** Next.js 15 (App Router, Server Components, Dynamic Routing)
* **Language:** TypeScript (Strict type-safety across models and API layers)
* **Styling & UI:** Tailwind CSS (Utility-first, highly responsive design)
* **Authentication:** Better Auth (Secure token & session handling)
* **Architecture:** Component-based scalable folder structure with custom React hooks

---

## 💻 Getting Started Locally

To run this project on your local machine, follow these simple steps:

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/bazar-dor.git](https://github.com/your-username/bazar-dor.git)

# 2. Navigate to the project directory
cd bazar-dor

# 3. Install dependencies
npm install

# 4. Configure environment variables
# Create a .env.local file in the root directory and add your auth/database credentials

# 5. Run the development server
npm run dev