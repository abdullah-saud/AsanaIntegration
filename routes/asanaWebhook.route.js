const express = require('express');
const { createNewWebhook, receiveWebhook, getAllWebhooks } = require('../controllers/webhookController');
const router = express.Router();

router.post('/createWebhook', async(req,res) =>{
    const reslt = await createNewWebhook();
    res.send({ data: reslt });
})

router.post('/receiveWebhook', async(req,res) =>{
    await receiveWebhook(req,res);
})

router.get('/getWebhook', async(_,res) =>{
    const webhooks = await getAllWebhooks();
    res.status(200).send(webhooks);
})
module.exports = router;