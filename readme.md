# 🔗 Asana Integration - Node.js Backend

This project enables integration with Asana using OAuth2, allowing authenticated users to view their assigned tasks and enabling webhook support for task updates.

---

## 🚀 Features

- OAuth2 integration with Asana
- Secure token storage with refresh handling
- Fetch authenticated user’s tasks
- Webhook support for task updates
- Modular, production-ready architecture

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **HTTP Requests:** Axios
- **Asana SDK:** Official `asana` client
- **Local Tunneling (for Webhooks):** Ngrok

---

## 🔧 Setup Instructions

### 1. Clone the Repository

### 2. Install Dependencies

### 3. Create a .env File

Fill in the following variables:

ASANA_CLIENT_ID=YOUR_ID
ASANA_CLIENT_SECRET=YOUR_SECRET
ASANA_REDIRECT_URI=https://0246-2401-4900-883c-10bc-d0f8-4817-7aef-e858.ngrok-free.app/asana/auth/callback
ASANA_AUTH_URL=https://app.asana.com/-/oauth_authorize?
ASANA_SCOPES=openid email profile default identity
ASANA_WEBHOOK_TARGET=https://0246-2401-4900-883c-10bc-d0f8-4817-7aef-e858.ngrok-free.app/webhook/receive


🧪 Run the App

npm start

Visit http://localhost:3000/asana/getRedirectUrl in your browser to begin the OAuth2 flow.

📦 Directory Structure

kroolo-assignment/
├── node_modules/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── task.routes.js
│   │   └── webhook.routes.js
│   ├── utils/
│   │   ├── oauth.helper.js
│   │   ├── project.helper.js
│   │   ├── token.helper.js
│   │   └── user.helper.js
│   └── webhooks/
│       └── webhook.handler.js
├── app.js
├── server.js
├── token.json
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md



🌐 Webhook Setup
Use Ngrok to expose localhost:

ngrok http 3000

Then use the HTTPS URL for webhook registration:

await webhooksApi.createWebhook({
  data: {
    resource: '<TASK_OR_PROJECT_GID>',
    target: 'https://<ngrok-url>/webhooks/create'
  }
});

📌 Notes
token.json is used to store your access and refresh tokens.

Webhook handlers can be extended to verify signatures for added security.

Use completed_since: 'now' to fetch only incomplete tasks.



