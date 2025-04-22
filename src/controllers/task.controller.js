const { ApiClient, UsersApi, TasksApi } = require('asana'); // Ensure proper imports
const { fetchAsanaToken } = require('../../utils/token.helper');
const { getUserInfo } = require('../../utils/user.helper');

// const getAccessToken = async () => {
//   const accessToken = await fetchAsanaToken();
//   if (!accessToken) {
//     throw new Error('Failed to fetch access token');
//   }
//   return accessToken;
// };

// const getUserInfo = async (apiClient) => {
//   const usersApi = new UsersApi(apiClient);
//   const meResponse = await usersApi.getUser('me');
//   const user = meResponse.data;

//   if (!user.workspaces || user.workspaces.length === 0) {
//     throw new Error('No workspaces found for user');
//   }

//   return { userGid: user.gid, workspaceGid: user.workspaces[0].gid, userName: user.name };
// };

const getTasksForUser = async (apiClient, userGid, workspaceGid) => {
  const tasksApi = new TasksApi(apiClient);
  const tasksResponse = await tasksApi.getTasks({
    assignee: userGid,
    workspace: workspaceGid,
    completed_since: 'now',
    opt_fields: 'name,due_on,projects.name',
  });
  return tasksResponse.data;
};

const getUserTasks = async () => {
  try {
    const accessToken = await fetchAsanaToken();

    const { userGid, workspaceGid, userName } = await getUserInfo(accessToken);

    const apiClient = new ApiClient();
    apiClient.authentications['token'].accessToken = accessToken;

    const tasks = await getTasksForUser(apiClient, userGid, workspaceGid);

    console.log(`Fetched ${tasks.length} tasks for user ${userName}`);
    return tasks;
  } catch (error) {
    console.error('Error fetching user tasks:', error.message);
    throw error;
  }
};

module.exports = { getUserTasks };
