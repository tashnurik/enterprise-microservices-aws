# Payment Service

Handles payment processing. **Deployed to ECS Fargate** for orchestration comparison.

## Endpoints
- `GET /` - Service info
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics
- `GET /payments` - List all payments
- `POST /payments` - Process payment

## Environment Variables
- `PORT` - Service port (default: 3003)

## Deployment
This service is deployed to AWS ECS Fargate (not EKS) to demonstrate different orchestration platforms.
