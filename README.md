# 🚀 PaySphere – Digital Wallet System

**PaySphere** is a full-stack digital wallet application designed to simulate real-world financial platforms like Paytm or Google Pay. It provides secure, role-based access for **Users, Agents, and Admins**, enabling efficient transaction management and scalable system design.

The application focuses on **secure authentication, real-time transaction handling, and clean UI-driven user experience** using modern web technologies.

---

## 📌 Key Features

### 🔐 Authentication & Authorization

* Secure login and registration using JWT
* Role-based access control (User, Agent, Admin)
* Protected routes and session handling

---

### 💸 Wallet Operations

* Deposit and withdraw money
* Send money between users
* Real-time wallet balance updates
* Transaction history with filtering

---

### 👤 User Dashboard

* View account balance and recent transactions
* Perform transfers, deposits, and withdrawals
* Profile management

---

### 🧑‍💼 Agent Dashboard

* Manage cash-in and cash-out operations
* Track handled transactions
* Profile updates

---

### 🛠️ Admin Dashboard

* Manage users and agents (approve, block, suspend)
* Monitor all transactions
* System-level overview and analytics

---

### 🎨 UI/UX Features

* Responsive design (mobile + desktop)
* Clean and intuitive interface
* Form validation and error handling
* Toast notifications and loading states

---

## 🏗️ Tech Stack

### Frontend

* React.js
* TypeScript
* Redux Toolkit & RTK Query
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript
* RESTful APIs

### Database

* MongoDB (Mongoose)

### Security

* JWT Authentication
* Password hashing using bcrypt
* Role-based authorization

---

## 📂 Project Structure

```id="y2g6wr"
PaySphere/
│
├── frontend/        # React + TypeScript application
├── backend/         # Node.js + Express API
├── config/          # Environment & database configuration
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash id="q9u1ze"
git clone https://github.com/surya-775/paysphere.git
cd paysphere
```

---

### 2️⃣ Setup Backend

```bash id="r7c4mv"
cd backend
npm install
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash id="k2x8nt"
cd frontend
npm install
npm start
```

---

### 4️⃣ Environment Variables

Create a `.env` file inside backend:

```env id="p4h7za"
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 🔑 Core Functionalities

* Secure digital wallet system
* Role-based dashboards
* REST API integration
* Transaction management system
* Scalable full-stack architecture

---

## 🚀 Future Enhancements

* 📱 Mobile application integration
* 📊 Advanced analytics dashboard
* 🔔 Notification system
* 🌐 Multi-currency support

---

## 👨‍💻 Author

**Jayasurya R**

* GitHub: https://github.com/surya-775
* LinkedIn: https://linkedin.com/in/jayasurya-r-a21247256

---

⭐ If you found this project useful, consider giving it a star!
