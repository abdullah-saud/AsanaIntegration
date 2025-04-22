const { ApiClient, WebhooksApi } = require('asana');
const { getUserInfo } = require('../../utils/user.helper');
const { getAllProjects } = require('../../utils/project.helper');
const { fetchAsanaToken } = require('../../utils/asana.helper');

// Initialise Asana API client with token
const initAsanaClient = async () => {
  try {
    const accessToken = await fetchAsanaToken();
    const client = new ApiClient();
    client.authentications['token'].accessToken = accessToken;
    return new WebhooksApi(client);
  } catch (error) {
    console.error('Error initializing Asana client:', error.message);
    throw new Error('Failed to initialize Asana client');
  }
};

// Create a new webhook
const createNewWebhook = async () => {
  try {
    const resArr = [];
    const accessToken = await fetchAsanaToken();
    const projectIds = await getAllProjects(accessToken);

    const webhooksApi = await initAsanaClient();

    for (let index = 0; index < projectIds.length; index++) {
      const resourceId = projectIds[index];
      const body = {
        data: {
          resource: resourceId,
          target: process.env.ASANA_WEBHOOK_TARGET,
          filters: [
            { action: 'changed', resource_type: 'task' },
            { action: 'added', resource_type: 'task' }
          ]
        }
      };

      try {
        const response = await webhooksApi.createWebhook(body);
        console.log("Webhook created:", response.data);
        resArr.push({ resourceId, status: 'Success', data: response.data });
      } catch (error) {
        console.error(`Failed to create webhook for resourceId ${resourceId}:`, error.message);
        resArr.push({ resourceId, status: 'Failed', error: error.message });
      }
    }

    return resArr; // Return the results of all attempts
  } catch (error) {
    console.error("Webhook creation failed:", error?.response?.body || error.message);
    throw new Error('Failed to create webhooks');
  }
};

// Receive webhook events or handshake verification
const receiveWebhook = async (req, res) => {
  const hookSecret = req.headers["x-hook-secret"];
  const eventSignature = req.headers["x-hook-signature"];

  // Handle handshake verification (initial webhook setup)
  if (hookSecret) {
    console.log("Received X-Hook-Secret handshake");
    res.set("X-Hook-Secret", hookSecret); // Save hookSecret for future event verification
    return res.status(200).send();
  }

  // Handle actual webhook event transmission (task changes, etc.)
  if (eventSignature) {
    console.log(`Webhook Event received at ${new Date()}`);
    console.log("Events:", JSON.stringify(req.body.events, null, 2));
    return res.status(200).send();
  }

  // If neither hookSecret nor eventSignature are present, return an error
  return res.status(400).send("Invalid webhook payload");
};

// Get all webhooks for a workspace
const getAllWebhooks = async () => {
  try {
    const accessToken = await fetchAsanaToken();
    const { workspaceGid } = await getUserInfo(accessToken);

    const webhooksApi = await initAsanaClient();
    const workspaceId = workspaceGid;
    const response = await webhooksApi.getWebhooks(workspaceId);
    console.log("Webhooks fetched:", response.data);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch webhooks:", error?.response?.body || error.message);
    throw new Error('Failed to fetch webhooks');
  }
};

// const deleteWebhooks = async () => {
//   try {
//     const webhooksApi = await initAsanaClient();
//     const response = await webhooksApi.deleteWebhook('1210041297063357');
//     console.log("Webhooks deleted:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch webhooks:", error?.response?.body || error.message);
//     throw error;
//   }
// };

module.exports = { createNewWebhook, receiveWebhook, getAllWebhooks };
