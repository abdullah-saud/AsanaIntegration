const { ApiClient, WebhooksApi } = require('asana');
const { fetchAsanaToken } = require('../utils/tokenHelper');

const createNewWebhook = async () => {
    const access_token = await fetchAsanaToken(); 
    const apiClient = new ApiClient();
    apiClient.authentications['token'].accessToken = access_token;
    const webhooksApiInstance = new WebhooksApi(apiClient);

    const body = {
        data: {
            resource: '1210029770170089',
            target: 'https://0246-2401-4900-883c-10bc-d0f8-4817-7aef-e858.ngrok-free.app/webhook/receiveWebhook',
            filters: [
                { action: 'changed', resource_type: 'task' },
                { action: 'added', resource_type: 'task' }
            ]
        }
    };

    try {
        const response = await webhooksApiInstance.createWebhook(body);
        console.log("Webhook created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to create webhook:", error?.response?.body || error.message);
        throw error;
    }
};
const receiveWebhook = async(req,res) => {
    if (req.headers["x-hook-secret"]) {
        console.log('At 33');
        const newSecret = req.headers["x-hook-secret"];
        res.set("X-Hook-Secret", newSecret);
        return res.status(200).send();
    }
    else if (req.headers["x-hook-signature"]) {
        console.log(`Events on ${Date()}:`);
        console.log('FINAL EVENT',req.body.events);
        res.status(200).send();
        
    }
    else return res.status(400).send();
}

const getAllWebhooks = async() => {
    const access_token = await fetchAsanaToken(); 
    const apiClient = new ApiClient();
    apiClient.authentications['token'].accessToken = access_token;
    const webhooksApiInstance = new WebhooksApi(apiClient);
    try {
        const response = await webhooksApiInstance.getWebhooks('1210029922789034');
        console.log("Webhook Fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch webhook:", error?.response?.body || error.message);
        throw error;
    }
    
}

module.exports = { createNewWebhook, receiveWebhook, getAllWebhooks }
