const express = require('express');
const router = express.Router();

const { redirectToAsana, handleAsanaCallback } = require('../controllers/auth.controller');

// Route to redirect the user to Asana for OAuth authentication
router.get('/asana/getRedirectUrl', redirectToAsana);

// Route to handle Asana OAuth callback
router.get('/asana/auth/callback', handleAsanaCallback);

module.exports = router;
