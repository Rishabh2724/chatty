# 💬 Chatty

A full-stack real-time chat application built with **React (Vite)**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**.

Chatty enables users to communicate instantly through a modern and responsive interface powered by WebSocket communication.

---

## 🚀 Features

* 🔐 JWT-based authentication
* 💬 Real-time messaging using Socket.IO
* 🗂 MongoDB data persistence (Mongoose)
* ⚡ Fast frontend powered by Vite
* 🌐 RESTful API with Express
* 🔒 Secure password hashing with bcryptjs
* 🧑‍🤝‍🧑 Multi-user chat support

---

## 🛠 Tech Stack

**Frontend**

* React
* Vite
* Axios
* Socket.IO client

**Backend**

* Node.js
* Express
* MongoDB (Mongoose)
* Socket.IO
* JSON Web Token (JWT)
* bcryptjs

---

## 📁 Project structure

```
chatty/
├── backend/              # Express + Socket.IO server
│   ├── src/
│   └── package.json
│
├── frontend/             # React (Vite) client
│   ├── src/
│   └── package.json
│
├── package.json          # Root scripts (optional)
├── README.md
└── .gitignore
```

---

## ⚙️ Prerequisites

* Node.js (>= 16 recommended)
* npm or yarn
* MongoDB instance (local or hosted: Atlas, etc.)

---

## ⚙️ Installation & setup

### 1. Clone the repository

```bash
git clone https://github.com/Rishabh2724/chatty.git
cd chatty
```

### 2. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

### 3. Environment variables

Create a `.env` file inside the **backend** folder and add the following (example):

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace placeholder values with your credentials.

### 4. Run locally

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm run dev
```

* Frontend default: `http://localhost:5173`
* Backend default: `http://localhost:5000`

---

## 📦 Scripts

**Backend** (from `backend/`)

```bash
npm run dev      # start dev server (nodemon / ts-node / whatever configured)
npm start        # start production server
```

**Frontend** (from `frontend/`)

```bash
npm run dev      # start Vite dev server
npm run build    # build for production
npm run preview  # preview production build
```

---

## 🔌 Suggested API endpoints (example)

> Adjust these examples to match your backend implementation.

* `POST /api/auth/register` — register a new user
* `POST /api/auth/login` — authenticate and receive JWT
* `GET /api/users` — list users (protected)
* `POST /api/messages` — send a message (or use socket event)
* `GET /api/messages/:chatId` — fetch messages for a chat

---

## 🔮 Roadmap / Future improvements

* Group chat / channels
* Presence (online / offline) indicators
* Message read receipts and typing indicators
* Image/file sharing support (upload + CDN)
* Message search and pagination
* Production deployment guide (Vercel / Railway / Heroku + MongoDB Atlas)

---

## 🤝 Contributing

Contributions are welcome — please follow this flow:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add ..." `
4. Push branch and open a Pull Request

Please keep PRs small and focused; add tests or screenshots where useful.
## 👨‍💻 Author

Rishabh Agarwal
