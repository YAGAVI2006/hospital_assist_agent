# 🏥 Starlight Medical Center – AI Hospital Information Assistant

> Intelligent Hospital Information & Virtual Receptionist powered by Google Gemini.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google)

---

# 📖 Overview

Starlight Medical Center AI Assistant is a full-stack hospital information platform built with React, Express, and Google Gemini. It provides hospital information, department guidance, doctor recommendations, and an AI-powered virtual receptionist.

---

# 🎥 Demo

- Live Demo: *(Add your deployed URL)*
- Demo Video: `video/demo.mp4`

---

# 📑 Table of Contents

1. Engineering Highlights
2. System Architecture
3. Component Responsibilities
4. AI Intelligence Pipeline
5. Backend Workflow
6. Prompt Engineering
7. Request Walkthrough
8. Project Structure
9. Technology Stack
10. API Documentation
11. Installation
12. Deployment
13. Future Architecture
14. Screenshots
15. Developer
16. License

---

# ⚙️ Engineering Highlights

- Prompt Engineering
- Hospital Context Injection
- Google Gemini Integration
- REST API
- Modular Backend
- Request Validation
- Error Handling
- Responsive SPA

---

# 🏗️ System Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
Express API
 ├── Hospital Data
 └── Gemini Service
        │
        ▼
 JSON Response
```

---

# 🧩 Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| React | User Interface |
| Express | REST API |
| Gemini Service | AI Response Generation |
| Hospital Data | Knowledge Source |
| Chat Route | Request Handling |

---

# 🤖 AI Intelligence Pipeline

```text
User Question
    │
Input Validation
    │
Hospital Data Loading
    │
Prompt Engineering
    │
Gemini API
    │
Response Formatting
    │
JSON Response
```

---

# 🔄 Backend Workflow

```text
/api/chat
   │
Route
   │
Gemini Service
   │
Hospital Data Service
   │
Formatter
   │
Response
```

---

# 🧠 Prompt Engineering

Each request includes:
- Hospital departments
- Doctors
- Services
- FAQs
- Contact information
- Emergency guidance
- User question
- Response instructions

---

# 💬 Request Walkthrough

**User:** I have chest pain.

↓

Validate request

↓

Load hospital information

↓

Generate Gemini prompt

↓

Recommend Cardiology department

↓

Return formatted response

---

# 📂 Project Structure

```text
hospital_assist_agent/
├── frontend/
├── backend/
│   ├── routes/
│   ├── services/
│   ├── data/
│   └── server.js
├── docs/
├── video/
├── README.md
└── .env.example
```

---

# 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend UI |
| Vite | Build Tool |
| Express | REST API |
| Node.js | Backend Runtime |
| Gemini | AI Engine |
| JSON | Hospital Knowledge Base |

---

# 🌐 API Documentation

## POST /api/chat

Request

```json
{
  "message":"Which doctor should I consult for fever?"
}
```

Response

```json
{
  "reply":"Consult the General Medicine department."
}
```

---

# ⚙️ Installation

```bash
git clone <repository-url>
cd hospital_assist_agent

cd backend
npm install

cd ../frontend
npm install
```

Create `.env`

```env
GEMINI_API_KEY=YOUR_API_KEY
PORT=5000
```

Run:

```bash
cd backend
npm start

cd ../frontend
npm run dev
```

---

# 🚀 Deployment

- Frontend: Vercel
- Backend: Render
- Configure environment variables before deployment.

---

# 🔮 Future Architecture

- Appointment Booking
- Authentication
- Patient Portal
- Medical Records
- Online Payments
- Video Consultation
- Notifications
- Admin Dashboard

---

# 📸 Screenshots

Add:

- Home
- Doctors
- Departments
- Services
- Chatbot
- Mobile View

---

# 👨‍💻 Developer

**Yagavi S**

- Full Stack Developer
- React • Node.js • Express • Gemini AI

GitHub: *(Add your profile)*

---

# 📜 License

MIT License.
