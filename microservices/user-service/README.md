# User Service

Handles user management operations.

## Endpoints
- `GET /` - Service info
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user

## Environment Variables
- `PORT` - Service port (default: 3001)

## Run Locally
```
npm install
npm start
```
