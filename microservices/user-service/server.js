const express = require('express');
const promClient = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3001;

// Prometheus metrics setup
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

// Middleware
app.use(express.json());

// Mock user data
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Routes
app.get('/', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/', status: 200 });
  res.json({ service: 'user-service', status: 'running', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/users', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/users', status: 200 });
  res.json({ users });
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    httpRequestCounter.inc({ method: 'GET', route: '/users/:id', status: 200 });
    res.json({ user });
  } else {
    httpRequestCounter.inc({ method: 'GET', route: '/users/:id', status: 404 });
    res.status(404).json({ error: 'User not found' });
  }
});

app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  httpRequestCounter.inc({ method: 'POST', route: '/users', status: 201 });
  res.status(201).json({ user: newUser });
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
