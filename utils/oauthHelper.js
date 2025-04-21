

const generateAsanaAuthUrl = () => {
    const params = new URLSearchParams({
        client_id: process.env.ASANA_CLIENT_ID,
        redirect_uri: process.env.ASANA_REDIRECT_URI,
        response_type: 'code',
        scope:'openid email profile default identity',
        state: Math.random().toString(36).substring(2, 15),
    });

    return `${process.env.ASANA_AUTH_URL}${params.toString()}`
    
}

module.exports = { generateAsanaAuthUrl };