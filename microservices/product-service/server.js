const express = require('express');
const promClient = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3004;

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

// Mock product data
let products = [
  { id: 1, name: 'Laptop', price: 1200, stock: 15 },
  { id: 2, name: 'Mouse', price: 25, stock: 100 },
  { id: 3, name: 'Keyboard', price: 75, stock: 50 }
];

// Routes
app.get('/', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/', status: 200 });
  res.json({ service: 'product-service', status: 'running', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/products', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', route: '/products', status: 200 });
  res.json({ products });
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    httpRequestCounter.inc({ method: 'GET', route: '/products/:id', status: 200 });
    res.json({ product });
  } else {
    httpRequestCounter.inc({ method: 'GET', route: '/products/:id', status: 404 });
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  };
  products.push(newProduct);
  httpRequestCounter.inc({ method: 'POST', route: '/products', status: 201 });
  res.status(201).json({ product: newProduct });
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
