# Medi-Connect AI

**Smart Healthcare & Appointment Platform**

Medi-Connect AI is a B.Tech mini-project that brings together patient guidance, doctor discovery, hospital discovery, appointment booking, medical records, follow-ups and notifications in one platform.

> **Important:** The AI assistant is intended for informational guidance only. It must not present itself as a doctor or claim to provide a medical diagnosis.

## 1. Project Goal

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

## 4. Feature Modules

### A. Authentication & Security
- Registration and login
- Password hashing
- JWT authentication
- Role-based access control
- Protected routes
- Input validation
- Central error handling
- Environment-based secrets
- API key protection

### B. Patient Management
- Patient dashboard
- Profile
- Medical history
- Medical records
- Appointment history

### C. Doctor & Hospital Discovery
- Doctor profiles
- Specialty
- Rating
- Availability
- Search and filters
- Hospital discovery
- Location-based discovery foundation

### D. AI & ML Intelligence
The AI/ML module is deliberately separated from ordinary CRUD APIs.

Planned intelligence:

1. **Symptom Understanding**
   - Accept natural-language symptom descriptions.
   - Extract relevant symptom information.
   - Return structured, non-diagnostic guidance.

2. **Specialty Suggestion**
   - Map symptoms/context to likely medical specialties.
   - Example: skin-related concerns → Dermatology.
   - The output is a recommendation, not a diagnosis.

3. **Lifestyle Guidance**
   - Provide general, low-risk lifestyle information.
   - Include an explicit limitation/disclaimer.

4. **Doctor Recommendation**
   - Combine specialty relevance with doctor metadata such as availability and rating.
   - Return ranked candidates.
   - Final selection remains with the user.

5. **No-show Prediction**
   - Future ML model to estimate appointment no-show probability.
   - Candidate features can include appointment history, timing and other project-approved non-sensitive operational features.
   - The actual dataset and algorithm are intentionally not invented in this scaffold.

6. **Crowd Prediction**
   - Future ML model for estimating hospital/clinic crowd levels.
   - Can support better timing recommendations.

7. **AI Safety**
   - Never claim diagnosis.
   - Avoid unsupported certainty.
   - Tell the user when professional medical care is appropriate.
   - Keep Gemini credentials on the backend.

## 5. Appointment Flow

```text
Doctor
  |
  +--> Define Availability
             |
             v
Patient --> View Slots
             |
             v
        Select Slot
             |
             v
        Book Appointment
             |
             v
      Backend validates
      doctor + time + user
             |
             v
        Confirmation
             |
             +--> Notification
             |
             +--> Reminder
```

The backend contains a conflict-checking foundation. For production-grade booking, keep the operation atomic using a MongoDB transaction/locking strategy on Atlas rather than relying only on a frontend check.

## 6. MongoDB Data Model

Collections:

```text
users
patients
doctors
doctorAvailabilities
appointments
medicalRecords
hospitals
notifications
```

Relationships:

```text
User
 ├── Patient profile
 └── Doctor profile

Patient
 ├── MedicalRecords
 └── Appointments

Doctor
 ├── DoctorAvailabilities
 └── Appointments

Appointment
 ├── Patient
 └── Doctor

Notification
 └── User
```

MongoDB is accessed through **Mongoose** as the ODM. The repository intentionally uses MongoDB Atlas and contains no Prisma setup.

## 7. API Design

Base URL:

```text
/api
```

### Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Patients

```text
GET   /api/patients/me
PUT   /api/patients/me
GET   /api/patients/me/records
POST  /api/patients/me/records
```

### Doctors

```text
GET /api/doctors
GET /api/doctors/:id
GET /api/doctors/:id/availability
```

### Appointments

```text
POST /api/appointments
GET  /api/appointments
GET  /api/appointments/:id
PATCH /api/appointments/:id/cancel
```

### AI

```text
POST /api/ai/symptoms
```

### Hospitals

```text
GET /api/hospitals
```

### Notifications

```text
GET /api/notifications
PATCH /api/notifications/:id/read
```

## 8. Five-Person Development Ownership

The division is by **end-to-end module ownership**, not by job title. Every owner is responsible for frontend/backend/database integration, testing and documentation for their module.

### Person 1 — Core Platform & Security
- Project setup and conventions
- MongoDB connection foundation
- User model
- Registration/login
- JWT
- RBAC
- Auth middleware
- Security validation
- Common backend middleware
- Integration support

### Person 2 — Patient Management
- Patient dashboard
- Patient profile
- Medical history
- Medical records
- Patient APIs
- Record UI
- Patient-side testing

### Person 3 — Doctor & Hospital Discovery
- Doctor model/profile
- Doctor search
- Specialty/rating filters
- Availability display
- Hospital model
- Hospital search
- Location-aware UI foundation
- Related APIs and testing

### Person 4 — AI & ML Intelligence
This is the largest intelligence-focused module.

**AI engineering**
- Gemini API integration
- Prompt design/versioning
- Symptom understanding
- Specialty suggestion
- Lifestyle guidance
- AI response schema
- AI safety/disclaimer
- Error/fallback handling
- AI API route
- Frontend AI assistant UI

**Doctor recommendation**
- Specialty matching
- Candidate filtering
- Ranking logic
- Recommendation explanation

**ML engineering**
- Dataset definition and cleaning
- Feature engineering
- Training notebooks
- Model selection
- Evaluation metrics
- No-show prediction
- Crowd prediction
- Model serialization/versioning
- Prediction service integration
- Monitoring/error analysis

**AI/ML testing**
- Prompt regression tests
- Structured-output validation
- Edge-case symptoms
- Unsafe/ambiguous requests
- Model evaluation
- False-positive/false-negative analysis

The scaffold does **not** fabricate a medical dataset or pretend that a trained model exists. The dataset, algorithm and metrics should be selected by the team based on available project data.

### Person 5 — Appointment & Notification System
- Availability/slot logic
- Booking
- Cancellation
- Rescheduling
- Appointment statuses
- Double-booking prevention
- Confirmation
- Notifications
- Reminder foundation
- Appointment UI and APIs

## 9. GitHub Workflow

Each person works on a separate branch:

```text
main
 |
 +-- feature/auth-security
 +-- feature/patient-management
 +-- feature/doctor-hospital
 +-- feature/ai-ml
 +-- feature/appointments
```

Recommended workflow:

```bash
git checkout main
git pull
git checkout -b feature/your-module

# work

git add .
git commit -m "feat: add doctor search"
git push -u origin feature/your-module
```

Then open a Pull Request.

### PR rules

- One logical feature per PR.
- Do not commit `.env`.
- Explain API/database changes.
- Test before pushing.
- Resolve merge conflicts in your own branch.
- At least one teammate reviews the PR.
- Merge only after CI passes.

## 10. Environment Setup

### Backend

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mediconnect
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_key
FRONTEND_URL=http://localhost:3000
```

### Frontend

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Never put `GEMINI_API_KEY`, `JWT_SECRET` or MongoDB credentials in frontend environment variables.

## 11. MongoDB Atlas Setup

1. Create a MongoDB Atlas account.
2. Create a cluster.
3. Create a database user.
4. Configure Network Access for your development environment.
5. Copy the application connection string.
6. Replace the username/password/database in `MONGODB_URI`.
7. Put the URI in `backend/.env`.
8. Start the backend.

Database name:

```text
mediconnect
```

Collections are created automatically when Mongoose models are used.

## 12. Local Development

From the repository root:

```bash
npm install
npm run install:all
```

Run both applications:

```bash
npm run dev
```

Or separately:

```bash
npm run dev:frontend
npm run dev:backend
```

Expected URLs:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:5000
Health:   http://localhost:5000/health
```

## 13. Development Phases

### Phase 1 — Foundation
- Repository setup
- MongoDB connection
- Authentication
- RBAC
- Base UI

### Phase 2 — Core Healthcare
- Patient profile
- Medical records
- Doctor data
- Hospital data

### Phase 3 — Discovery
- Doctor search
- Filters
- Hospital discovery
- Availability display

### Phase 4 — AI/ML
- Gemini integration
- Symptom understanding
- Specialty suggestion
- Lifestyle guidance
- Doctor recommendation
- ML research/training pipeline

### Phase 5 — Appointments
- Slot management
- Booking
- Cancellation/rescheduling
- Notifications/reminders

### Phase 6 — Integration & Deployment
- End-to-end flow
- Security review
- Testing
- Vercel frontend
- Render backend
- MongoDB Atlas
- Production environment variables

## 14. Testing Strategy

### Frontend
- Component tests
- Form validation
- API error states
- Loading states
- Protected pages

### Backend
- Controller/service tests
- Authentication tests
- RBAC tests
- Validation tests
- Booking conflict tests
- AI service error tests

### AI/ML
- Prompt regression tests
- Structured response validation
- Safety tests
- Model metrics
- Data leakage checks
- Prediction edge cases

### End-to-end
Test the complete flow:

```text
Register
  -> Login
  -> Dashboard
  -> Enter Symptoms
  -> AI Guidance
  -> Doctor Search
  -> Select Doctor
  -> Select Slot
  -> Book
  -> Confirmation
  -> Notification
  -> Medical History
```

## 15. Security Checklist

- [ ] Passwords are hashed.
- [ ] JWT secret is stored only in backend environment variables.
- [ ] Gemini key is never exposed to the browser.
- [ ] Request validation is enabled.
- [ ] Authorization is checked server-side.
- [ ] Sensitive data is not logged.
- [ ] MongoDB credentials are never committed.
- [ ] HTTPS is used in production.
- [ ] Rate limiting is added before production.
- [ ] Booking operations are made atomic before production.

## 16. Future Scope

The project specification identifies future directions including:
- Wearable integration
- Telemedicine
- Multilingual AI
- Voice assistant
- IoT monitoring
- Predictive analytics

These should remain future-scope items unless the team explicitly adds them to the current sprint.

## 17. Important Engineering Rule

Do not merge all five people's code directly into one giant file.

Each module should expose clean interfaces:

```text
Frontend module
      |
      v
API route
      |
      v
Controller
      |
      v
Service
      |
      v
Mongoose model
      |
      v
MongoDB Atlas
```

AI follows:

```text
Frontend AI UI
      |
      v
POST /api/ai/symptoms
      |
      v
AI Controller
      |
      v
Gemini Service
      |
      +----> Structured guidance
      |
      +----> Specialty suggestion
      |
      +----> Safety disclaimer
```

This keeps the five modules independently developable while still forming one integrated application.
