# Architecture

## Layers

1. **Frontend** — Next.js pages, reusable components, client services.
2. **API** — Express routes and controllers.
3. **Business services** — appointment, AI, ML and domain logic.
4. **Persistence** — Mongoose models backed by MongoDB Atlas.
5. **External AI** — Gemini API, called only from the backend.

## Request lifecycle

```text
Browser
 -> Next.js UI
 -> API client
 -> Express route
 -> Auth/RBAC middleware
 -> Validator
 -> Controller
 -> Service
 -> Mongoose
 -> MongoDB
```

AI request:

```text
Browser
 -> /api/ai/symptoms
 -> Auth
 -> Validation
 -> AI controller
 -> Gemini service
 -> Safety/normalization
 -> JSON response
 -> Browser
```
