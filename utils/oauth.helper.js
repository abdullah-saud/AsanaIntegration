/**
 * Generates the Asana OAuth URL for user authentication
 * @returns {string} The Asana OAuth authorization URL
 */

const generateAsanaAuthUrl = () => {
  // Ensure all required environment variables are available
  if (!process.env.ASANA_CLIENT_ID || !process.env.ASANA_REDIRECT_URI || !process.env.ASANA_AUTH_URL) {
    throw new Error('Missing required environment variables for Asana OAuth');
  }

  const state = Math.random().toString(36).substring(2, 15);

  const params = new URLSearchParams({
    client_id: process.env.ASANA_CLIENT_ID,
    redirect_uri: process.env.ASANA_REDIRECT_URI,
    response_type: 'code',
    scope: process.env.ASANA_SCOPES || 'openid email profile default identity',
    state: state, // Random state for CSRF protection
  });

  // Return Asana OAuth URL
  return `${process.env.ASANA_AUTH_URL}?${params.toString()}`;
};

module.exports = { generateAsanaAuthUrl };
