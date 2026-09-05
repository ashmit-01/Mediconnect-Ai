# Medi-Connect AI

**Smart Healthcare & Appointment Platform**

Medi-Connect AI is a B.Tech mini-project that brings together patient guidance, doctor discovery, hospital discovery, appointment booking, medical records, follow-ups and notifications in one platform.

> **Important:** The AI assistant is intended for informational guidance only. It must not present itself as a doctor or claim to provide a medical diagnosis.

 Project Goal

The project addresses a fragmented healthcare journey where users may need separate services to understand symptoms, find an appropriate doctor, locate hospitals, book appointments and manage medical information.

### Main patient journey

```text
Patient
  |
  v
Enter Symptoms
  |
  v
AI Guidance
  |
  v
Suggested Medical Specialty
  |
  v
Find / Recommend Doctor
  |
  v
Doctor Profile
  |
  v
Check Availability
  |
  v
Book Appointment
  |
  v
Confirmation + Reminder
  |
  v
Appointment
  |
  v
Medical Record / History
```

The project specification also describes Find Doctor, Book Appointment, Find Hospital, Manage Records and Follow-ups as core parts of the platform.

## 2. High-Level Architecture

```text
                         +----------------------+
                         |       Patient        |
                         |  Doctor / Admin      |
                         +----------+-----------+
                                    |
                                    v
                    +-------------------------------+
                    | Frontend - Next.js / React    |
                    | Pages + Components + Services |
                    +---------------+---------------+
                                    |
                              REST / JSON
                                    |
                                    v
                    +-------------------------------+
                    | Backend - Node.js + Express   |
                    | Auth / RBAC / APIs / Services |
                    +-------+---------------+-------+
                            |               |
                            v               v
                 +----------------+   +----------------+
                 | MongoDB Atlas  |   | Gemini API     |
                 | Mongoose       |   | AI Service     |
                 +----------------+   +----------------+
                                            |
                                            v
                                    +---------------+
                                    | ML Modules    |
                                    | Prediction    |
                                    +---------------+
```

### Deployment model

```text
Frontend  ---> Vercel
Backend   ---> Render
Database  ---> MongoDB Atlas
AI        ---> Gemini API
ML        ---> Backend-integrated prediction services
```

The original project specification lists React/Next.js, Node.js + Express, Gemini API, JWT + RBAC and cloud deployment. This repository uses **MongoDB Atlas + Mongoose** as the database implementation.

## 3. Repository Structure

```text
MediConnect-AI/
│
├── frontend/                       # Next.js frontend
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   ├── ai/
│   │   ├── doctors/
│   │   ├── hospitals/
│   │   ├── appointments/
│   │   ├── medical-history/
│   │   └── notifications/
│   ├── components/
│   │   ├── common/
│   │   ├── patient/
│   │   ├── doctor/
│   │   ├── ai/
│   │   ├── appointment/
│   │   └── hospital/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   ├── types/
│   ├── utils/
│   └── public/
│
├── backend/                        # Node.js + Express API
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/                 # Mongoose models
│       ├── routes/
│       ├── services/
│       │   ├── ai/
│       │   └── ml/
│       ├── validators/
│       ├── utils/
│       └── server.ts
│
├── ml/                             # ML research/training area
│   ├── data/
│   ├── notebooks/
│   ├── models/
│   ├── training/
│   └── prediction/
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   ├── database.md
│   ├── ai.md
│   └── team-workflow.md
│
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
