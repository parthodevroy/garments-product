# Project Name  

🧵 Garments Order & Product Tracking System

A full-stack Garments Management Platform designed to handle product creation, bulk order processing, role-based dashboards, and real-time order tracking. This system is built for Buyers, Managers, and Admins with a modern, scalable architecture.



## About the Project 
This project is a role-based eCommerce & order management system designed for a garments / product distribution platform.
It allows different types of users to access features based on their roles, ensuring a secure, organized, and efficient workflow.

The system supports buyers, managers, and administrators, each with clearly defined permissions.
Buyers can place orders and track their purchase history, managers can handle product creation and order processing, and administrators can oversee users, products, and overall system operations.

The main goal of this project is to simplify product management, order tracking, and role-based access control while providing a clean and responsive dashboard interface.

This application is built using modern frontend technologies and follows scalable project structure, making it suitable for real-world eCommerce or garments management systems..

---

## Project Overview  
This platform helps garments businesses manage products, process orders, approve workflows, and track order status from creation to completion — all in one place.

---

## Key Features  
## 👤 Role‑Based Access Control (RBAC)

Buyer – Browse products, place orders, view order history & payments

Manager – Create products, approve/reject orders, manage production flow

Admin – Manage users, oversee all orders & products

## 🛒 Product Management

Create & manage garments products

Image‑based product cards

Short descriptions for quick viewing

Price & quantity control

## 📦 Order Lifecycle

Buyer places an order

Manager reviews pending orders

Manager approves or rejects

Approved orders move to completed status

Full tracking at each stage

## 📊 Dashboard System

Premium hover‑expand sidebar

Clean and responsive UI

Separate dashboards for each role

Smooth animations using Framer Motion

## 🔐 Authentication & Security

Firebase Authentication

JWT protected API routes

Role verification middleware

Secure Axios instance
---

## Tech Stack  
**Frontend:** React (Vite)

React Router DOM

Tailwind CSS + DaisyUI

Framer Motion (animations)

TanStack React Query

Axios 

**Backend:** Node.js

Express.js

MongoDB

JWT Authentication 

**Tools:** Git · VS Code · Firebase · JWT

---

## 📁 Project Structure

src/
├─ components/
├─ pages/
├─ layouts/
├─ hooks/
├─ routes/
├─ context/
├─ assets/
└─ main.jsx

## Dependencies  
List required dependencies or major libraries:

```json
  {
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.10",
    "axios": "^1.13.2",
    "firebase": "^12.6.0",
    "lottie-react": "^2.4.1",
    "motion": "^12.23.24",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.66.0",
    "react-icons": "^5.5.0",
    "react-leaflet": "^5.0.0-rc.2",
    "react-responsive-carousel": "^3.2.23",
    "react-router": "^7.9.6",
    "react-simple-typewriter": "^5.0.1",
    "react-toastify": "^11.0.5",
    "recharts": "^3.5.1",
    "sweetalert2": "^11.26.3",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.17"
  },
```

---

## Installation️ & Setup
1. Clone the repo and install dependencies:

```bash
git clone https://github.com/parthodevroy/garments-product.
cd garments-order-system
npm install
```

2. Set up environment variables by creating a `.env` file in the root directory:

```env
VITE_API_URL=https://garments-management-server.vercel.app
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
```

3. Run the application:

```bash
npm run dev
```

---




## Contact
## rpartho787@gmail.com


**Live URL:** [Live Site](https://cheery-hummingbird-22f081.netlify.app/)
**Email:** [Partho Roy](rpartho787@gmail.com)
