const express = require('express');
const router = express.Router();

const { redirectToAsana, handleAsanaCallback } = require('../controllers/auth.controller');

router.get('/asana/getRedirectUrl', redirectToAsana);
router.get('/asana/auth/callback', handleAsanaCallback);

module.exports = router;