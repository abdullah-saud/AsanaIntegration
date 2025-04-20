const express = require('express');
const { generateAsanaAuthUrl } = require('../utils/oauthHelper');
const router = express.Router();
const authUrl = 'https://app.asana.com/-/oauth_authorize';


router.get('/getRedirectUrl', (req,res) =>{
    try {
        console.log('INSIDE 33333');
        const authUrl = generateAsanaAuthUrl();
        console.log('URl', authUrl);
        res.redirect(authUrl);
    } catch (error) {
        console.error('Error generating Asana OAuth URL:', err);
        res.status(500).send('Internal Server Error');
    }
})


module.exports = router;




