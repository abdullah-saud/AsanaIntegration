const fs = require('fs').promises;
const { default: axios } = require('axios');
const path = require('path');

// File where tokens are temporarily stored
const tokenPath = path.join(__dirname, '../../token.json');

// Save token to file
const saveTokenTemporarily = async ({ token }) => {
  try {
    await fs.writeFile(tokenPath, JSON.stringify(token, null, 2), 'utf-8');           //We can implement hashing techniques here to store data safely
    console.log('Token saved successfully');
  } catch (err) {
    console.error('Failed to save token', err);
  }
};

// Read token from file
const fetchAsanaToken = async () => {
  try {
    const fileData = await fs.readFile(tokenPath, 'utf-8');
    const data = JSON.parse(fileData);
    const { expires_at, access_token, refresh_token } = data;

    if (Date.now() < expires_at) {
      return access_token;
    } else {
      console.log('Token Expired');
      return getAccessTokenAndDetails({ grant_type: 'refresh_token', refresh_token });
    }
  } catch (err) {
    console.error('Error reading or parsing token.json:', err.message);
    throw err;
  }
};

const getAccessTokenAndDetails = async({ grant_type = 'authorization_code', code = null, refresh_token = null }) => {
  const tokenRes = await axios.post('https://app.asana.com/-/oauth_token', null, {
      params: {
        grant_type,
        client_id: process.env.ASANA_CLIENT_ID,
        client_secret: process.env.ASANA_CLIENT_SECRET,
        redirect_uri: process.env.ASANA_REDIRECT_URI,
        refresh_token,
        code,
      }
    });

    const tokenData = { ...tokenRes.data, expires_at: Date.now() + tokenRes.data.expires_in * 1000 };
    await saveTokenTemporarily({ token: tokenData });
    return tokenData.access_token;
}

module.exports = { saveTokenTemporarily, fetchAsanaToken, getAccessTokenAndDetails };
