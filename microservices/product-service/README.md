# Product Service

Manages product catalog.

## Endpoints
- `GET /` - Service info
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics
- `GET /products` - List all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product

## Environment Variables
- `PORT` - Service port (default: 3004)
