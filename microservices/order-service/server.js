const express = require('express');
const promClient = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3002;

// Prometheus metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

app.use(express.json());

// Mock order data
let orders = [
  { id: 1, userId: 1, product: 'Laptop', quantity: 1, status: 'completed' },
  { id: 2, userId: 2, product: 'Mouse', quantity: 2, status: 'pending' }
];

// Routes
app.get('/', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/', status: 200 });
  res.json({ service: 'order-service', status: 'running', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/orders', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/orders', status: 200 });
  res.json({ orders });
});

app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    httpRequestCounter.inc({ method: 'GET', route: '/orders/:id', status: 200 });
    res.json({ order });
  } else {
    httpRequestCounter.inc({ method: 'GET', route: '/orders/:id', status: 404 });
    res.status(404).json({ error: 'Order not found' });
  }
});

app.post('/orders', (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    userId: req.body.userId,
    product: req.body.product,
    quantity: req.body.quantity,
    status: 'pending'
  };
  orders.push(newOrder);
  httpRequestCounter.inc({ method: 'POST', route: '/orders', status: 201 });
  res.status(201).json({ order: newOrder });
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
