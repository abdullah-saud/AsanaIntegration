const fs = require('node:fs/promises');
const { getAccessTokenAndDetails } = require('./token.helper');
const path = require('path');
const tokenPath = path.join(process.cwd(), 'token.json');

const fetchAsanaToken = async () => {
  try {
    const fileData = await fs.readFile(tokenPath, 'utf-8');
    const data = JSON.parse(fileData);
    console.log('DATTATATATA', data);
    const { expires_at, access_token, refresh_token } = data;

    // If the token is still valid, return it
    if (Date.now() < expires_at) {
      return access_token;
    }

    // Token is expired, refresh the token
    console.log('Token expired, refreshing...');
    return getAccessTokenAndDetails({ grant_type: 'refresh_token', refresh_token, prevData: data });
  } catch (err) {
    console.error('Error reading or parsing token.json:', err.message);
    throw new Error('Failed to fetch access token: ' + err.message);
  }
};

module.exports =  { fetchAsanaToken };