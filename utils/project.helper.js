const { ApiClient, ProjectsApi } = require('asana'); // Ensure proper imports

const getAllProjects = async (accessToken) => {

    const apiClient = new ApiClient();
    apiClient.authentications['token'].accessToken = accessToken;
    const usersApi = new ProjectsApi(apiClient);
    const results = await usersApi.getProjects();
    console.log('PROJECTSTTS', results.data);
    const projects = results.data;

    if (!projects || projects.length === 0) {
        throw new Error('No projects found for user');
    }

  return projects.map((d) => d.gid);
};

module.exports = { getAllProjects };