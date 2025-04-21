const fs = require('fs').promises;
const saveTokenTemporarily = async ({ token }) => {
    try {
        await fs.writeFile('token.json', JSON.stringify(token, null, 2), 'utf-8');
        console.log('Token saved successfully');
    } catch (err) {
        console.error('Failed to save token', err);
    }
}

const fetchAsanaToken = async () => {
    const fileData = await fs.readFile('token.json');
    const data = JSON.parse(fileData)
    console.log('DATA', data);
    const { expires_at } = data;
    if(expires_at < Date.now()){
        // Refresh token
    } else{
        const { access_token } = data;
        return access_token;
    }
}

module.exports = { saveTokenTemporarily, fetchAsanaToken }