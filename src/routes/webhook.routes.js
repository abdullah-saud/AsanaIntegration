const express = require('express');
const {
  createNewWebhook,
  receiveWebhook,
  getAllWebhooks,
  deleteWebhooks,
} = require('../controllers/webhook.controller');

const router = express.Router();

// Create new webhook
router.post('/webhook/create', async (_, res) => {
  const result = await createNewWebhook();
  res.status(201).json({ webhook: result });
});

// Receive webhook from Asana
router.post('/webhook/receive', async (req, res) => {
  await receiveWebhook(req, res); // Ensure the controller handles both success and error
});

// Get all registered webhooks
router.get('/webhook/all', async (req, res) => {
  const webhooks = await getAllWebhooks();
  res.status(200).json({ webhooks });
});

// router.get('/webhook/delete', async (req, res) => {
//   const webhooks = await deleteWebhooks();
//   res.status(200).json({ webhooks });
// });


module.exports = router;
