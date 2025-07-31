# 📦 Meal Calorie Tracker – Backend

This is the backend server for the Meal Calorie Tracker app. It provides APIs for:

* 🔐 User authentication
* 🍵 Calorie calculation using the USDA API
* 💬 Feedback submission and updates

---

## 💠 Tech Stack

* **Node.js** + **Express**
* **MongoDB** with **Mongoose**
* **JWT Authentication**
* **USDA FoodData Central API**
* Zustand (used in frontend for state)

---

## 📁 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Swapniil15/meal-calorie-backend.git
cd meal-calorie-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/meal-calorie
JWT_SECRET=your_jwt_secret
USDA_API_KEY=lWTv4hcWr8P6WRiBz73LZMJARJYtKTAjWFV52uB4
```

> ⚠️ Replace `your_jwt_secret` with a strong secret key.

### 4. Start the Server

```bash
npm start
```

Server will run at: [http://localhost:8000](http://localhost:8000)

---

## 📌 API Endpoints

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| POST   | `/api/users/register` | Register a new user            |
| POST   | `/api/users/login`    | Login and get JWT token        |
| POST   | `/get-calories`       | Get calorie info from USDA API |
| POST   | `/submit-feedback`    | Submit or update user feedback |

> 🔐 **Protected endpoints require:**
> `Authorization: Bearer <token>`

---

## 🔒 Authentication

* JWT-based authentication
* Secure token storage recommended (HTTP-only cookie or localStorage)

---

## 💬 Feedback Feature

* Each user can leave feedback per dish.
* If feedback already exists for a (user, dish) combo, it will be updated instead of creating a duplicate.

---

## 📬 Contact

For issues or suggestions, please open an issue or contact the maintainer.

---
