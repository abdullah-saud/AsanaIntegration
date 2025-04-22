const { ApiClient, UsersApi } = require('asana'); // Ensure proper imports

const getUserInfo = async (accessToken) => {
  try {
    const apiClient = new ApiClient();
    apiClient.authentications['token'].accessToken = accessToken;
    const usersApi = new UsersApi(apiClient);

    // Fetch user data from Asana API
    const meResponse = await usersApi.getUser('me');
    const user = meResponse.data;

    // Check if workspaces are available for the user
    if (!user.workspaces || user.workspaces.length === 0) {
      throw new Error('No workspaces found for user');
    }

    console.log(`Fetched user info: ${user.name} (GID: ${user.gid}), Workspace GID: ${user.workspaces[0].gid}`);

    return { userGid: user.gid, workspaceGid: user.workspaces[0].gid, userName: user.name };
  } catch (error) {
    console.error('Error fetching user info:', error.message);
    throw new Error('Failed to fetch user information: ' + error.message);
  }
};

module.exports = { getUserInfo };
