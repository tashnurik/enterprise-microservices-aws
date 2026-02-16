const express = require('express');
const promClient = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3005;

// Prometheus metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

const notificationCounter = new promClient.Counter({
  name: 'notifications_sent_total',
  help: 'Total number of notifications sent',
  labelNames: ['type'],
  registers: [register]
});

app.use(express.json());

// Mock notification data
let notifications = [
  { id: 1, userId: 1, type: 'email', message: 'Order confirmed', sent: true },
  { id: 2, userId: 2, type: 'sms', message: 'Payment received', sent: true }
];

// Routes
app.get('/', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/', status: 200 });
  res.json({ service: 'notification-service', status: 'running', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/notifications', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/notifications', status: 200 });
  res.json({ notifications });
});

app.post('/notifications', (req, res) => {
  const newNotification = {
    id: notifications.length + 1,
    userId: req.body.userId,
    type: req.body.type,
    message: req.body.message,
    sent: true
  };
  notifications.push(newNotification);
  notificationCounter.inc({ type: req.body.type });
  httpRequestCounter.inc({ method: 'POST', route: '/notifications', status: 201 });
  res.status(201).json({ notification: newNotification });
});

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
