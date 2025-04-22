const express = require('express');
const {
  createNewWebhook,
  receiveWebhook,
  getAllWebhooks,
} = require('../controllers/webhook.controller');

const router = express.Router();

// Create new webhook
router.post('/webhook/create', async (_, res) => {
  try {
    const result = await createNewWebhook();
    res.status(201).json({ webhook: result });
  } catch (error) {
    res.status(500).json({ message: 'Webhook creation failed', error: error.message });
  }
});

// Receive webhook from Asana
router.post('/webhook/receive', async (req, res) => {
  await receiveWebhook(req, res); // already handles response in controller
});

// Get all registered webhooks
router.get('/webhook/all', async (req, res) => {
  try {
    const webhooks = await getAllWebhooks();
    res.status(200).json({ webhooks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch webhooks', error: error.message });
  }
});

module.exports = router;
