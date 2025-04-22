const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/auth.routes');
const taskRoutes = require('./src/routes/task.routes');
const webhookRoutes = require('./src/routes/webhook.routes');

app.use('/', authRoutes);
app.use('/', taskRoutes);
app.use('/', webhookRoutes);

// Start server
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
