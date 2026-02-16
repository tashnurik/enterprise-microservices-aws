# Gateway Service (API Gateway)

Routes requests to appropriate microservices.

## Endpoints
- `GET /` - Gateway info and available routes
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics
- `/api/users/*` - Proxy to user-service
- `/api/orders/*` - Proxy to order-service
- `/api/payments/*` - Proxy to payment-service
- `/api/products/*` - Proxy to product-service
- `/api/notifications/*` - Proxy to notification-service

## Environment Variables
- `PORT` - Service port (default: 3000)
- `USER_SERVICE_URL` - User service URL
- `ORDER_SERVICE_URL` - Order service URL
- `PAYMENT_SERVICE_URL` - Payment service URL
- `PRODUCT_SERVICE_URL` - Product service URL
- `NOTIFICATION_SERVICE_URL` - Notification service URL
