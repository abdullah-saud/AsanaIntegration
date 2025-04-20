

const generateAsanaAuthUrl = () => {
    console.log('###',process.env.ASANA_CLIENT_ID);
    const params = new URLSearchParams({
        client_id: process.env.ASANA_CLIENT_ID,
        redirect_uri: process.env.ASANA_REDIRECT_URI,
        response_type: 'code',
        scope:'openid email profile projects:read projects:write tasks:read tasks:write users:read',
        state: Math.random().toString(36).substring(2, 15),
    });

    console.log('1');
    return `https://app.asana.com/-/oauth_authorize?${params.toString()}`
    
}

module.exports = { generateAsanaAuthUrl };

// https://app.asana.com/-/oauth_authorize?response_type=code&client_id=1210029771550769&redirect_uri=http://localhost:3008/&scope=openid email profile projects:read projects:write tasks:read tasks:write users:read&state=<STATE_PARAM>