# Order Service

Manages order processing.

## Endpoints
- `GET /` - Service info
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics
- `GET /orders` - List all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order

## Environment Variables
- `PORT` - Service port (default: 3002)
