# 🔗 Asana Integration - Node.js Backend

This project enables integration with Asana using OAuth2, allowing authenticated users to view their assigned tasks and enabling webhook support for task updates.

---

## 🚀 Features

- OAuth2 integration with Asana
- Secure token storage with refresh handling
- Fetch the authenticated user’s tasks
- Webhook support for task updates

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

ASANA_CLIENT_ID=YOUR_CLIENT_ID
ASANA_CLIENT_SECRET=YOUR_CLIENT_SECRET
ASANA_REDIRECT_URI=https://0246-2401-4900-883c-10bc-d0f8-4817-7aef-e858.ngrok-free.app/asana/auth/callback
ASANA_AUTH_URL=https://app.asana.com/-/oauth_authorize?

ASANA_SCOPES=openid email profile default identity
ASANA_WEBHOOK_TARGET=https://0246-2401-4900-883c-10bc-d0f8-4817-7aef-e858.ngrok-free.app/webhook/receive


### 4. Run the App

npm run dev

Visit http://localhost:3008/asana/getRedirectUrl in your browser to begin the OAuth2 flow.



### 5. Webhook Setup

Use Ngrok to expose localhost:

ngrok http 3008

Then use the HTTPS URL for webhook registration:


📌 Notes
token.json is used to store your access and refresh tokens.

Webhook handlers can be extended to verify signatures for added security.

Use completed_since: 'now' to fetch only incomplete tasks.



