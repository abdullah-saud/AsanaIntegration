const express = require('express');
const app = express();
const oauthRoutes = require('./routes/asanaAuth.route');
const taskRoutes = require('./routes/asanaTasks.routes');
const webhookRoutes = require('./routes/asanaWebhook.route');
require('dotenv').config();
app.use(express.json());

app.use('/asana', oauthRoutes);
app.use('/tasks', taskRoutes);

app.use('/webhook',webhookRoutes);

app.listen(3008, () => console.log('Server Up and Running'));
