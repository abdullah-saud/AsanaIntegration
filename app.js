const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Built-in middleware to parse JSON
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/auth.routes');
const taskRoutes = require('./src/routes/task.routes');
const webhookRoutes = require('./src/routes/webhook.routes');

// Registering routes
app.use('/', authRoutes);
app.use('/', taskRoutes);
app.use('/', webhookRoutes);

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler to catch unhandled errors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start server with try-catch for safety
const PORT = process.env.PORT || 3008;
try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  console.error('Failed to start server:', err);
}
