const express = require('express');
const { generateAsanaAuthUrl } = require('../utils/oauthHelper');
const router = express.Router();
const axios = require('axios');
const { saveTokenTemporarily } = require('../utils/tokenHelper');

router.get('/getRedirectUrl', (req,res) =>{
    try {
        const authUrl = generateAsanaAuthUrl();
        res.redirect(authUrl);
    } catch (error) {
        console.error('Error generating Asana OAuth URL:', err);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/auth/callback', async (req,res) => {
    
    const { code } = req.query;
    if (!code) {
        return res.status(400).json({ message: 'Missing authorization code in callback' });
    }
    try {
        const tokenRes = await axios.post('https://app.asana.com/-/oauth_token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.ASANA_CLIENT_ID,
                client_secret: process.env.ASANA_CLIENT_SECRET,
                redirect_uri: process.env.ASANA_REDIRECT_URI,
                code
            }
        });
        
        // Adjust expiry time for later use
        const tokenData = {
            ...tokenRes.data,
            expires_at: Date.now() + tokenRes.data.expires_in * 1000,
        };

        await saveTokenTemporarily({ token: tokenData });
        res.status(201).json({
            msg: 'Successfully fetched Asana Tokens',
            tokenData
        });

    } catch (error) {
        logger.error('Error exchanging code for token:', err?.response?.data || err.message);
        return res.status(500).json({ message: 'Failed to fetch token from Asana' });
    }
})


module.exports = router;




