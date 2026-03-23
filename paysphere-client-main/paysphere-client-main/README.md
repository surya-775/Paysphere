# PaySphere Fullstack Project 

**PaySphere** is a fullstack digital wallet application fully implemented in **TypeScript**, providing **secure, role-based access** for Users, Agents, and Admins. The frontend is built with **React.js + TypeScript**, **Redux Toolkit**, and **RTK Query**, while the backend uses **Node.js/Express + TypeScript**, **MongoDB**, and **JWT** authentication.

This project simulates real-world wallet operations similar to bKash or Nagad, including deposits, withdrawals, money transfers, and transaction history management.

---

## 🔗 Live Link

* **Frontend**: [https://paysphere-client.vercel.app](https://paysphere-client.vercel.app) 
* **Backend**: [https://pay-sphere-server.vercel.app](https://pay-sphere-server.vercel.app)
* **Backend Repository**: [https://github.com/imam0321/PaySphere-server](https://github.com/imam0321/PaySphere-server)

---

## 🚀 Project Overview

* **Role-Based Dashboards**: Different interfaces and capabilities for Users, Agents, and Admins.
* **Wallet Operations**: Deposit, withdraw, send money, and view transaction history.
* **Authentication & Authorization**: JWT-based login and registration with role selection.
* **Data Management**: Efficient state handling using Redux Toolkit and RTK Query.
* **Responsive Design**: Mobile-first UI using Tailwind CSS.
* **Admin Controls**: Manage users, agents, transactions, and system settings.

---

## 🧱 Tech Stack

* **Frontend**: React.js + TypeScript, Redux Toolkit, RTK Query, Tailwind CSS
* **Backend**: Node.js + TypeScript, Express, MongoDB, Mongoose, JWT, bcrypt
* **Development Tools**: Vite, ESLint, Prettier, Postman (API testing)

---

## 📦 Installation & Setup

### Frontend

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/imam0321/paysphere-client.git
   cd paysphere-client
   bun install
   bun run dev
   ```

   Frontend runs on [http://localhost:3000](http://localhost:3000)

### Backend

1. Clone the backend repository:

   ```bash
   git clone https://github.com/imam0321/PaySphere-server.git
   cd PaySphere-server
   bun install
   bun run dev
   ```

   Backend runs on [http://localhost:5000](http://localhost:5000) by default.

2. Configure `.env` with your MongoDB URI and JWT secret.

---

## 🧪 Features & Functionalities

### Public Landing Pages

* Home, About, Features, Contact, FAQ
* Responsive design with navigation bar, hero banner, and footer

### Authentication

* Registration and login with JWT
* Role-based redirection (User, Agent, Admin)
* Persisted sessions and logout functionality

### User Dashboard

* Wallet balance overview
* Deposit, withdraw, and send money functionality
* Transaction history with filtering and pagination
* Profile management (update name, phone, password)

### Agent Dashboard

* Overview of cash-in/out operations
* Transaction history handled by agents
* Profile management

### Admin Dashboard

* Overview of total users, agents, transactions, and volume

* Manage users and agents (approve, suspend, block/unblock)

* View and filter all transactions

* Profile management

### General Features

* Role-based navigation
* Loading indicators and global error handling
* Form validations and toast notifications
* Data visualization with cards, charts, and tables
* Fully responsive design


---

## 🧪 Test Credentials

Use the following accounts to test the application:

| Role  | Email                                                  | Password  |
| ----- | ---------------------------------------------------    | --------  |
| User  | [imam.hossain0321@gmail.com](mailto:devsafix@gmail.com)| 123456789 |
| Agent | [tom@gmail.com](mailto:demodriver@gmail.com)           | 123456789 |
| Admin | [admin@gmail.com](mailto:admin@ride.com)               | 123456789 |

---


## 📧 Contact

* Email: [imam.hossain0321@example.com](mailto:imam0321@example.com)


