# API Contract

Base path: `/api`

## Authentication

`POST /auth/register`

`POST /auth/login`

`GET /auth/me`

Protected endpoints require:

```text
Authorization: Bearer <JWT>
```

## Domain routes

```text
/api/patients
/api/doctors
/api/appointments
/api/ai
/api/hospitals
/api/notifications
```

See `backend/src/routes` for the starter implementation.
