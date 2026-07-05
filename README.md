# 🏥 Starlight AI Hospital Assistant

> **An AI-powered Hospital Information System built using React, Node.js, Express.js, and Google Gemini AI to provide instant hospital-related assistance.**

---

## 📖 Overview

**Starlight AI Hospital Assistant** is an intelligent hospital information platform designed to improve patient experience by providing quick and accurate hospital information through an AI-powered chatbot.

Instead of searching multiple web pages or contacting the hospital reception for basic information, users can simply ask questions in natural language. The AI assistant instantly responds with details about doctors, departments, OP timings, emergency services, insurance coverage, hospital facilities, and frequently asked questions.

The application combines a modern React frontend with an Express backend and Google Gemini AI to deliver a fast, responsive, and user-friendly healthcare experience.

---

# ✨ Features

* 🏥 Modern Hospital Website
* 🤖 AI-Powered Hospital Assistant
* 👨‍⚕️ Doctor Information
* 🩺 Medical Departments
* 💊 Hospital Services
* 🚑 24×7 Emergency Support
* 🕒 OP Timings
* 📍 Hospital Contact & Location
* 🛡 Insurance Information
* ❓ Frequently Asked Questions
* 🔍 Department & Doctor Search
* 📱 Responsive Design

---

# 🚀 Tech Stack

## Frontend

* React (Vite)
* HTML5
* CSS3
* JavaScript

## Backend

* Node.js
* Express.js

## AI Integration

* Google Gemini API

## Deployment

* Render

## Version Control

* Git
* GitHub

---

# 🏗️ System Architecture

```text
                    User
                      │
                      ▼
            React Frontend (Vite)
                      │
               HTTP Requests
                      │
                      ▼
             Express.js Backend
                      │
      Prompt Engineering + Gemini API
                      │
                      ▼
          AI Generated Response
                      │
                      ▼
                 Frontend UI
```

---

# 📂 Project Structure

```text
hospital_assist_agent/

├── backend/
│   ├── data/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

---

# 🤖 AI Hospital Assistant

The AI assistant is powered by **Google Gemini** and helps users by answering hospital-related questions in natural language.

Example questions:

* What are the OP timings?
* Which doctors are available today?
* Tell me about the Cardiology department.
* What insurance providers are accepted?
* What emergency services are available?
* What are the hospital visiting hours?

---

# 🧠 Prompt Engineering

The application uses Prompt Engineering to ensure that the AI responds only to hospital-related queries.

### Example Prompt

```text
You are an AI assistant for Starlight Medical Center.

Your responsibility is to answer only hospital-related questions.

Provide information about:

• Doctors
• Departments
• Hospital Services
• OP Timings
• Emergency Services
• Insurance
• FAQs
• Contact Information

If the question is unrelated to the hospital, politely inform the user that you can only assist with hospital-related queries.
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/YAGAVI2006/hospital_assist_agent.git
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# 🔄 Application Workflow

```text
User opens website
        │
        ▼
User enters a question
        │
        ▼
React sends request to Express API
        │
        ▼
Backend applies Prompt Engineering
        │
        ▼
Google Gemini API processes the request
        │
        ▼
AI generates an appropriate response
        │
        ▼
Response is displayed in the chatbot
```

---

# 🌐 Deployment

### Backend

Render

### Frontend

React Application

*http://localhost:5173/*

---

# 🎯 Key Highlights

* AI-powered Hospital Information Assistant
* Google Gemini API Integration
* Prompt Engineering
* Full Stack Web Application
* Responsive User Interface
* REST API Communication
* Modern React Architecture

---

# 📚 Learning Outcomes

Through this project, I gained practical experience in:

* React Development
* Express.js API Development
* REST API Integration
* Google Gemini AI Integration
* Prompt Engineering
* Environment Variable Management
* Frontend and Backend Communication
* Full Stack Deployment using Render

---

# 🚀 Future Enhancements

* MongoDB Integration
* Appointment Booking System
* Patient Login & Authentication
* Doctor Dashboard
* Online Appointment Scheduling
* Voice-enabled AI Assistant
* Medical Report Download
* Multi-language Support
* Online Payment Integration

---

# 👩‍💻 Developer

**Yagavi S**

Department of Information Technology

---

# 📄 License

This project is developed for academic and educational purposes.

---

# 🙏 Acknowledgements

* Google Gemini API
* React
* Vite
* Node.js
* Express.js
* Render
* GitHub

