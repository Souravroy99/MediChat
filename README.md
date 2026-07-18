# 🩺 MediChat

An AI-powered medical chatbot built with **Next.js**, **Google Gemini**, and **Firebase** that helps users understand their symptoms by generating possible medical conditions, severity assessments, personalized recommendations, and concise health summaries through an interactive conversational interface.

### 🌐 Live Demo
👉 https://medi-chat-ten.vercel.app

---

# 🧠 Why MediChat?

Many people search online for medical information but often receive scattered or unreliable results. MediChat provides a conversational AI experience that helps users better understand their symptoms while keeping all conversations securely stored for future reference.

> **Disclaimer:** MediChat is intended for informational purposes only and should not replace professional medical advice, diagnosis, or treatment.

---

# 🌟 Features

### 🤖 AI-Powered Symptom Analysis

- Analyze user-reported symptoms using Google Gemini
- Generate possible medical conditions
- Assess symptom severity
- Provide personalized health recommendations
- Generate concise medical summaries

### 💬 Interactive Medical Chat

- Natural conversational interface
- Context-aware AI responses
- Persistent chat history
- Seamless multi-session conversations

### 🔐 Secure Authentication

- Firebase Authentication
- Email & Password Sign-In
- Secure server-side session management

### 💾 Persistent Data Storage

Cloud Firestore stores:

- Chat history
- Medical summaries
- AI recommendations
- Severity assessments
- User information

### 🖥️ Modern User Interface

- Built with Next.js App Router
- Responsive UI
- Tailwind CSS
- ShadCN UI
- React Hook Form + Zod Validation

---

# 🏛️ System Architecture

### 1. User enters symptoms

User → MediChat Interface

↓

### 2. Request sent to backend

Next.js Server Actions

↓

### 3. Google Gemini analyzes symptoms

Generates:

- Possible conditions
- Severity assessment
- Personalized recommendations
- Medical summary

↓

### 4. Response returned to user

AI-generated medical guidance displayed in chat

↓

### 5. Conversation stored

Cloud Firestore stores:

- User chats
- AI responses
- Medical summaries
- Recommendations

---

# ⚙️ Tech Stack

## 🎨 Frontend

- Next.js 15 (App Router)
- React
- JavaScript
- Tailwind CSS
- ShadCN UI
- React Hook Form

## 🧠 AI

- Google Gemini

## 🔥 Backend

- Next.js Server Actions
- Firebase Admin SDK

## 🗄️ Database & Authentication

- Firebase Firestore
- Firebase Authentication

## ☁️ Deployment

- Vercel

---

# 📂 Project Structure

```text
MediChat/
│
├── app/
│   ├── (auth)/
│   ├── (root)/
│   ├── interview/
│   ├── api/
│   └── layout.js
│
├── components/
│   ├── ui/
│   ├── AuthForm.jsx
│   ├── ChatCard.jsx
│   └── ...
│
├── firebase/
│   ├── admin.js
│   └── client.js
│
├── lib/
│   ├── actions/
│   └── utils.js
│
├── public/
│
├── .env.local
├── package.json
└── README.md
```

---

# 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/Souravroy99/MediChat.git
cd MediChat
```

### Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file:

```env
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

GROQ_API_KEY=
```

### Start the development server

```bash
npm run dev
```

---

# 📌 Disclaimer

MediChat provides AI-generated health information for educational and informational purposes only. It is **not** a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns.

---

# ⭐ If you found this project helpful, consider giving it a star!
