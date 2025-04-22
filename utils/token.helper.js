const fs = require('node:fs/promises');
const axios = require('axios');
const path = require('path');

// File where tokens are temporarily stored
const tokenPath = path.join(process.cwd(), 'token.json');

const saveTokenTemporarily = async ({ token }) => {
  try {
    // Saving token to file (for development or temporary use only)
    // TODO: Consider encrypting the token before saving it in production.
    await fs.writeFile(tokenPath, JSON.stringify(token, null, 2), 'utf-8');
    console.log('Token Refreshed successfully');

  } catch (err) {
    console.error('Failed to save token:', err.message);
  }
};


/**
 * Fetches a new access token using the authorization code or refresh token.
 * @param {Object} params The parameters to request the token.
 * @param {string} params.grant_type The grant type ('authorization_code' or 'refresh_token').
 * @param {string} [params.code] The authorization code (if grant_type is 'authorization_code').
 * @param {string} [params.refresh_token] The refresh token (if grant_type is 'refresh_token').
 * @returns {string} The access token.
 */
const getAccessTokenAndDetails = async ({ grant_type = 'authorization_code', code = null, refresh_token = null, prevData = {} }) => {
  try {
    // Make the API request to Asana to get the new access token
    const tokenRes = await axios.post('https://app.asana.com/-/oauth_token', null, {
      params: {
        grant_type,
        client_id: process.env.ASANA_CLIENT_ID,
        client_secret: process.env.ASANA_CLIENT_SECRET,
        redirect_uri: process.env.ASANA_REDIRECT_URI,
        refresh_token,
        code,
      },
    });

    console.log('Prev Data', prevData);


    const tokenData = { 
      ...prevData,
      ...tokenRes.data, 
      expires_at: Date.now() + tokenRes.data.expires_in * 1000 
    };
    console.log('new token Data', tokenData);

    // Save the new token to the file
    await saveTokenTemporarily({ token: tokenData });

    return tokenData.access_token;
  } catch (err) {
    console.error('Error fetching token from Asana:', err);
    throw new Error('Failed to fetch token from Asana: ' + err.message);
  }
};

module.exports = { saveTokenTemporarily, getAccessTokenAndDetails };
