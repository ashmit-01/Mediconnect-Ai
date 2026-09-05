# Database Design — MongoDB Atlas

## Collections

- `users`
- `patients`
- `doctors`
- `doctoravailabilities`
- `appointments`
- `medicalrecords`
- `hospitals`
- `notifications`

## Design principles

- Use ObjectId references between major entities.
- Add indexes for frequently searched fields.
- Keep credentials and secrets out of documents.
- Validate request payloads before database writes.
- Prefer transactions for multi-document appointment operations when deployed on a MongoDB replica set/Atlas.

## Main relationships

```text
users 1---1 patients
users 1---1 doctors
patients 1---N medicalrecords
patients 1---N appointments
doctors 1---N doctoravailabilities
doctors 1---N appointments
users 1---N notifications
```
