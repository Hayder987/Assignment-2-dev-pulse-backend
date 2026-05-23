# 🚀 DevPulse Backend

Internal Tech Issue & Feature Tracker API  
A scalable backend system for reporting bugs, managing features, and handling team collaboration.

---

## 📌 Project Overview

DevPulse is a role-based issue tracking system where:

- 👨‍💻 Contributors can report bugs & feature requests and also update own issue  
- 🧑‍🔧 Maintainers can manage, update, and delete issues  
- 🔐 JWT-based authentication ensures secure access  
- 🗄️ PostgreSQL stores all structured data  

---

## 🛠️ Tech Stack

| Technology         | Usage                  |
| ------------------ | ---------------------- |
| Node.js            | Runtime                |
| TypeScript         | Type-safe development  |
| Express.js         | Backend framework      |
| PostgreSQL         | Database               |
| pg (native driver) | DB connection          |
| bcryptjs           | Password hashing       |
| jsonwebtoken       | Authentication         |
| dotenv             | Environment config     |
| http-status-codes  | Standard HTTP handling |
| tsx                | Development runner     |

---

## 🌐 Live API

## Live API Link
The API is deployed and live at:
👉 **[https://assignment-2-dev-pulse-backend.onrender.com](https://assignment-2-dev-pulse-backend.onrender.com)**

## 📁 Project Structure

DEV_PULSE_BACKEND/

```
│
├── src/
│   │
│   ├── config/
│   │   ├── env.config.ts
│   │   └── README.md
│   │
│   ├── db/
│   │   ├── pool.ts
│   │   ├── db.init.ts
│   │   ├── README.md
│   │   │
│   │   └── schema/
│   │       ├── user.schema.ts
│   │       ├── issue.schema.ts
│   │       └── README.md
│   │
│   ├── errors/
│   │   ├── appError.ts
│   │   └── README.md
│   │
│   ├── interfaces/
│   │   ├── errorHandler.interface.ts
│   │   ├── errorResponse.interface.ts
│   │   ├── jwtPayload.interface.ts
│   │   ├── successResponse.interface.ts
│   │   └── README.md
│   │
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   ├── globalErrorHandler.ts
│   │   ├── roleAccess.middleware.ts
│   │   ├── index.d.ts
│   │   └── README.md
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.route.ts
│   │   │   ├── auth.interface.ts
│   │   │   ├── auth.validation.ts
│   │   │   └── README.md
│   │   │
│   │   └── issues/
│   │       ├── issue.controller.ts
│   │       ├── issue.service.ts
│   │       ├── issue.route.ts
│   │       ├── issue.interface.ts
│   │       ├── issue.validation.ts
│   │       └── README.md
│   │
│   ├── utils/
│   │   ├── handleError.ts
│   │   ├── sendErrorResponse.ts
│   │   ├── sendSuccessResponse.ts
│   │   ├── sendValidationError.ts
│   │   └── README.md
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .env.local.example
├── package.json
├── tsconfig.json
└── README.md
```



## 🚀 Features

### 🔐 Authentication
- User registration (signup)
- User login (JWT token generation)
- Password hashing with bcrypt

### 👥 Role System
- 👨‍💻 contributor
- 🧑‍🔧 maintainer

### 🐞 Issue Management
- Create issue (bug / feature request)
- Get all issues (filter + sort)
- Get single issue
- Update issue (role-based access)
- Delete issue (maintainer only)

### ⚡ Security
- JWT protected routes
- Role-based authorization middleware
- Centralized error handling

---

## 🗄️ Database Schema

### 👤 Users Table
- id → Auto increment
- name → required
- email → unique
- password → hashed
- role → contributor | maintainer
- created_at → timestamp
- updated_at → timestamp

### 🐞 Issues Table
- id → Auto increment
- title → max 150 chars
- description → min 20 chars
- type → bug | feature_request
- status → open | in_progress | resolved
- reporter_id → user reference
- created_at → timestamp
- updated_at → timestamp

---

## 🌐 API Endpoints

### 🔐 Auth Module

**Register**
POST /api/auth/signup

**Login**
POST /api/auth/login

---

### 🐞 Issues Module

**Create Issue**
POST /api/issues
Authorization: Bearer <JWT>

**Get All Issues**
GET /api/issues?sort=newest&type=bug&status=open

**Get Single Issue**
GET /api/issues/:id

**Update Issue**
PATCH /api/issues/:id
Authorization: <JWT>

**Delete Issue (Maintainer Only)**
DELETE /api/issues/:id
---

## 🔐 Authentication Flow

User Login
   ↓
JWT Token Generate
   ↓
Client stores token
   ↓
Request → Authorization header
   ↓
Server verifies token
   ↓
Role-based access granted




---

## ⚠️ Standard Response Format

### ✅ Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```
### ❌ Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "statusCode": 400,
    "path": "/api/issues",
    "method": "POST"
  }
}
```
----

## 🧪 Run Project

 Install dependencies

- npm install
- Run development server
- npm run dev


## 🚀 Deployment

 Supported platforms:

- ✅ Vercel (light backend)
- ✅ Render (recommended)
- ✅ Railway (recommended)

### Database:
- 🗄️ NeonDB / Supabase / ElephantSQL
- 📌 Important Rules
- ❌ No ORM allowed
- ❌ No query builder
- ✅ Only raw SQL (pool.query)
- ✅ Strict TypeScript usage
- ✅ Must follow API specification exactly

## 👨‍💻 Author

**Hayder Ali**  
Backend Developer (Full Stack)

- 🚀 DevPulse Backend System
- ⚙️ Node.js + TypeScript + PostgreSQL
- 💡 Passionate about scalable backend systems
- 🌐 GitHub: https://github.com/Hayder987
- 💼 Email: hayderbd4290@gmail.com

## ⭐ Final Note

This project follows:

- Clean modular architecture
- Scalable backend design
- Production-level error handling
- Secure JWT authentication
- Role-based access control