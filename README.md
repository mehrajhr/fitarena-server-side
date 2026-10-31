# FitArena (Server Side)

This is the backend server and REST API for **FitArena**, an athletic event booking and management platform. It handles secure data persistence, user authentication verification via JSON Web Tokens (JWT), event filtering, booking transactions, and role-based access control.

FitArena is a full-stack athletic event booking and management platform designed to connect athletes, sports organizers, and enthusiasts. Users can browse upcoming competitions, register for events, manage their bookings, and create or moderate athletic events.

---

## Live Demo
* **Live Website:** https://fit-arena-6de23.web.app/
* **Server Repository:** https://github.com/mehrajhr/fitarena-client-side

---

## Key Features

* **RESTful API Endpoints:** Structured endpoints for managing events, bookings, and user metadata.
* **JWT Authentication & Security:** Secure token generation and verification middleware to protect private routes and database mutations.
* **Duplicate Booking Prevention:** Backend query validation to ensure users cannot book the same athletic event twice.
* **Dynamic Database Queries:** Filter and query events and bookings dynamically based on creator email, user email, search keywords, and event categories.
* **CORS & Environment Protection:** Configured production-ready CORS policies and secure environment variable handling for database credentials.

---

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database & ODM:** MongoDB (Node.js Native Driver / Mongoose)
* **Authentication Security:** JSON Web Tokens (JWT), bcrypt
* **Utilities:** Dotenv, CORS, Cookie-Parser
* **Hosting:** Vercel

---

## Environment Variables Setup
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
FB_SECRET_KEY=your_jwt_secret_key

## Installation & Running Locally

git clone https://github.com/mehrajhr/fitarena-server-side.git

## Navigate to the project directory:
cd fitarena-server-side

## Install dependencies:
npm install

## Run the development server:
npm start