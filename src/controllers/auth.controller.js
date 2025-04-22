const { generateAsanaAuthUrl } = require('../../utils/oauth.helper');
const { getAccessTokenAndDetails } = require('../../utils/token.helper');

const redirectToAsana = (_, res) => {
  try {
    const authUrl = generateAsanaAuthUrl(); // Generate the Asana OAuth URL
    res.redirect(authUrl); // Redirect to Asana for OAuth authorization
  } catch (err) {
    console.error('Error generating Asana OAuth URL:', err.message);
    res.status(500).send('Internal Server Error');
  }
};

const handleAsanaCallback = async (req, res) => {
  const { code, error } = req.query;

  // If an error (ex-, access denied), respond with the appropriate status code
  if (error) {
    return res.status(error === 'access_denied' ? 403 : 400)
      .json({ message: `${error} ! Unable to Connect` });
  }

  if (!code) {
    return res.status(400).json({ message: 'Missing authorization code in callback' });
  }

  try {
    // Fetch the access token and user details using the authorization code
    await getAccessTokenAndDetails({ code });
    res.status(201).json({ msg: 'Successfully fetched Asana Tokens' });
  } catch (err) {
    console.error('Error exchanging code for token:', err?.response?.data || err.message);
    res.status(500).json({ message: 'Failed to fetch token from Asana' });
  }
};

module.exports = { redirectToAsana, handleAsanaCallback };
