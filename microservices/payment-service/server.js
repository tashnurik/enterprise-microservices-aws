const express = require('express');
const promClient = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3003;

// Prometheus metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

const paymentCounter = new promClient.Counter({
  name: 'payments_processed_total',
  help: 'Total number of payments processed',
  labelNames: ['status'],
  registers: [register]
});

app.use(express.json());

// Mock payment data
let payments = [
  { id: 1, orderId: 1, amount: 1200, status: 'success' },
  { id: 2, orderId: 2, amount: 50, status: 'pending' }
];

// Routes
app.get('/', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/', status: 200 });
  res.json({ service: 'payment-service', status: 'running', version: '1.0.0', deployment: 'ECS' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/payments', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/payments', status: 200 });
  res.json({ payments });
});

app.post('/payments', (req, res) => {
  const newPayment = {
    id: payments.length + 1,
    orderId: req.body.orderId,
    amount: req.body.amount,
    status: Math.random() > 0.1 ? 'success' : 'failed'
  };
  payments.push(newPayment);
  paymentCounter.inc({ status: newPayment.status });
  httpRequestCounter.inc({ method: 'POST', route: '/payments', status: 201 });
  res.status(201).json({ payment: newPayment });
});

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT} (ECS Deployment)`);
});
