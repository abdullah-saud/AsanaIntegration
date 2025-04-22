const { ApiClient, TasksApi } = require('asana');
const { getUserInfo } = require('../../utils/user.helper');
const { fetchAsanaToken } = require('../../utils/asana.helper');

// Helper function to fetch tasks for a specific user
const getTasksForUser = async (apiClient, userGid, workspaceGid) => {
  try {
    const tasksApi = new TasksApi(apiClient);
    const tasksResponse = await tasksApi.getTasks({
      assignee: userGid,
      workspace: workspaceGid,
      completed_since: 'now', // Fetch only active tasks
      opt_fields: 'name,due_on,projects.name',
    });
    return tasksResponse.data;
  } catch (error) {
    console.error(`Error fetching tasks for user ${userGid}:`, error.message);
    throw new Error('Failed to fetch tasks for user');
  }
};

// Controller method to get tasks for the authenticated user
const getUserTasks = async () => {
  try {
    const accessToken = await fetchAsanaToken();
    console.log('object', accessToken);
    if (!accessToken) {
      throw new Error('Failed to fetch access token');
    }
    const { userGid, workspaceGid, userName } = await getUserInfo(accessToken);

    // Initialize the Asana API client
    const apiClient = new ApiClient();
    apiClient.authentications['token'].accessToken = accessToken;

    // Fetch tasks for the user
    const tasks = await getTasksForUser(apiClient, userGid, workspaceGid);

    console.log(`Fetched ${tasks.length} tasks for user ${userName}`);
    return tasks;
  } catch (error) {
    console.error('Error fetching user tasks:', error.message);
    throw new Error('Failed to fetch user tasks');
  }
};

module.exports = { getUserTasks };
