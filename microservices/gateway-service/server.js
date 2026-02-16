const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const promClient = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Prometheus metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestCounter = new promClient.Counter({
  name: 'gateway_requests_total',
  help: 'Total number of gateway requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

app.use(express.json());

// Service URLs (will be environment variables in Kubernetes)
const USER_SERVICE = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const ORDER_SERVICE = process.env.ORDER_SERVICE_URL || 'http://localhost:3002';
const PAYMENT_SERVICE = process.env.PAYMENT_SERVICE_URL || 'http://localhost:3003';
const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3004';
const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005';

// Gateway routes
app.get('/', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/', status: 200 });
  res.json({ 
    service: 'api-gateway', 
    status: 'running', 
    version: '1.0.0',
    routes: {
      users: '/api/users',
      orders: '/api/orders',
      payments: '/api/payments',
      products: '/api/products',
      notifications: '/api/notifications'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Proxy middleware for each service
app.use('/api/users', createProxyMiddleware({ 
  target: USER_SERVICE, 
  changeOrigin: true,
  pathRewrite: { '^/api/users': '' }
}));

app.use('/api/orders', createProxyMiddleware({ 
  target: ORDER_SERVICE, 
  changeOrigin: true,
  pathRewrite: { '^/api/orders': '' }
}));

app.use('/api/payments', createProxyMiddleware({ 
  target: PAYMENT_SERVICE, 
  changeOrigin: true,
  pathRewrite: { '^/api/payments': '' }
}));

app.use('/api/products', createProxyMiddleware({ 
  target: PRODUCT_SERVICE, 
  changeOrigin: true,
  pathRewrite: { '^/api/products': '' }
}));

app.use('/api/notifications', createProxyMiddleware({ 
  target: NOTIFICATION_SERVICE, 
  changeOrigin: true,
  pathRewrite: { '^/api/notifications': '' }
}));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
