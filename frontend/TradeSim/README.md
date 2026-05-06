# TradeSim

A paper trading simulator that lets users practice buying and selling stocks with real market data — no real money required.

---

## What It Does

- Register and log in with a secure account
- Search any stock by ticker symbol with live prices via Finnhub
- Buy and sell stocks using a simulated $10,000 starting balance
- Track your holdings, cash balance, and full trade history

---

## Tech Stack

**Frontend:** React 19, React Router DOM, Vite, Tailwind CSS, Finnhub API

**Backend:** FastAPI, SQLAlchemy, SQLite, argon2, JWT

---

## Prerequisites

Make sure you have the following installed:

- Python 3.11+
- Node.js 18+
- npm

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/paper-trading-platform.git
cd paper-trading-platform
```

---

### 2. Backend Setup (FastAPI)

**Navigate to the backend folder:**

```bash
cd backend
```

**Create and activate a virtual environment:**

```bash
python3 -m venv ../.venv
source ../.venv/bin/activate
```

**Install dependencies:**

```bash
pip install fastapi uvicorn sqlalchemy argon2-cffi pyjwt python-multipart requests
```

**Start the backend server:**

```bash
uvicorn app.main:app --reload
```

The backend will run at: `http://localhost:8000`

You can view all API endpoints at: `http://localhost:8000/docs`

---

### 3. Frontend Setup (React + Vite)

Open a **new terminal tab** and navigate to the frontend:

```bash
cd frontend/TradeSim
```

**Install dependencies:**

```bash
npm install
```

**Start the frontend dev server:**

```bash
npm run dev
```

The frontend will run at: `http://localhost:5173`

---

## Running the App

You need **two terminals running at the same time:**

| Terminal | Command                         | URL                     |
| -------- | ------------------------------- | ----------------------- |
| Backend  | `uvicorn app.main:app --reload` | `http://localhost:8000` |
| Frontend | `npm run dev`                   | `http://localhost:5173` |

---

## Environment Notes

- If port 8000 is already in use, kill it with:

```bash
lsof -ti :8000 | xargs kill -9
```

- If your frontend runs on a different port (5174, 5175, etc.), update `allow_origins` in `backend/app/main.py` to include that port.

---

## API Endpoints

| Method | Endpoint      | Description                 | Auth Required |
| ------ | ------------- | --------------------------- | ------------- |
| POST   | `/register`   | Create a new account        | No            |
| POST   | `/login`      | Login and receive JWT token | No            |
| GET    | `/me`         | Get current user info       | Yes           |
| GET    | `/portfolio`  | Get cash balance            | Yes           |
| POST   | `/trade/buy`  | Buy a stock                 | Yes           |
| POST   | `/trade/sell` | Sell a stock                | Yes           |
| GET    | `/holdings`   | View current holdings       | Yes           |
| GET    | `/trades`     | View trade history          | Yes           |

---

## Password Requirements

When registering, your password must:

- Be at least 10 characters long
- Contain at least one uppercase letter
- Contain at least one number
- Contain at least one special character (`!@#$%^&*...`)

---

## Project Structure

```
paper-trading-platform/
├── backend/
│   └── app/
│       ├── main.py        # API routes
│       ├── auth.py        # JWT + password hashing
│       ├── models.py      # Database models
│       ├── schemas.py     # Request schemas
│       ├── database.py    # DB connection
│       └── session.py     # DB session
├── frontend/
│   └── TradeSim/
│       └── src/
│           └── components/
│               ├── LoginPage.jsx
│               ├── DashboardPage.jsx
│               ├── PracticePage.jsx
│               ├── HomePage.jsx
│               └── ...
└── README.md
```

---

## Built By

Jasmine Vu & Trevor — Cal State Fullerton
