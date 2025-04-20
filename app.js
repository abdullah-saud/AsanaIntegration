const express = require('express');
const app = express();
const oauthRoutes = require('./routes/authRoute');
require('dotenv').config();
app.use(express.json());

console.log('INSIDE 222');
app.use('/asana', oauthRoutes);

app.listen(3008, () => console.log('Server Up and Running'));
