const { ApiClient, UsersApi } = require('asana'); // Ensure proper imports

const getUserInfo = async (accessToken) => {
    const apiClient = new ApiClient();
    apiClient.authentications['token'].accessToken = accessToken;
    const usersApi = new UsersApi(apiClient);
    const meResponse = await usersApi.getUser('me');
    const user = meResponse.data;

  if (!user.workspaces || user.workspaces.length === 0) {
    throw new Error('No workspaces found for user');
  }

  return { userGid: user.gid, workspaceGid: user.workspaces[0].gid, userName: user.name };
};

module.exports = { getUserInfo };