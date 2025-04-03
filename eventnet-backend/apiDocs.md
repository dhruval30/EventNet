# EventNet API Documentation

## Auth Routes (`/api/auth`)

| Route              | Method | Description                                |
|--------------------|--------|--------------------------------------------|
| /api/auth/signup   | POST   | Registers a new user                       |
| /api/auth/login    | POST   | Logs in an existing user and returns token |

---

## User Routes (`/api/users`)

| Route                    | Method | Description                                                      |
|--------------------------|--------|------------------------------------------------------------------|
| /api/users/profile       | PUT    | Updates user profile with name, college, domain, bio, LinkedIn   |
| /api/users/profile       | GET    | Fetches current user's profile                                   |
| /api/users/dashboard     | GET    | Returns dashboard data (events joined, profile progress, etc.)   |

---

## Event Routes (`/api/events`)

| Route                      | Method | Description                                                           |
|----------------------------|--------|-----------------------------------------------------------------------|
| /api/events/join           | POST   | User joins an event using event ID and code                          |
| /api/events/:id            | GET    | Fetches details of a specific event including attendees              |
| /api/events/:id/attendees  | GET    | Returns list of attendees for the event                              |

---

## Admin Routes (`/api`)

| Route              | Method | Description                               |
|--------------------|--------|-------------------------------------------|
| /api/events        | POST   | Admin can create a new event              |
| /api/events        | GET    | Admin can fetch all events                |
| /api/events/:id    | DELETE | Admin can delete a specific event         |
