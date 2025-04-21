const { ApiClient, UsersApi, TasksApi } = require('asana');
const { fetchAsanaToken } = require('../utils/tokenHelper');

const getUserTasks = async () => {
  const access_token = await fetchAsanaToken(); 

  const apiClient = new ApiClient();
  apiClient.authentications['token'].accessToken = access_token;

 
  const usersApi = new UsersApi(apiClient);
  const meResponse = await usersApi.getUser('me');
  const me = meResponse.data;

  const userGid = me.gid;
  const workspaceGid = me.workspaces?.[0]?.gid;
  if (!workspaceGid) {
    throw new Error('No workspace found for user');
  }

  // Fetch tasks assigned to the user
  const tasksApi = new TasksApi(apiClient);
  const tasksResponse = await tasksApi.getTasks({
    assignee: userGid,
    workspace: workspaceGid,
    completed_since: 'now',
    opt_fields: 'name,due_on,projects.name'
  });

  return tasksResponse.data;
};

module.exports = { getUserTasks };
