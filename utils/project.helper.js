const { ApiClient, ProjectsApi } = require('asana'); // Ensure proper imports

const getAllProjects = async (accessToken) => {
  if (!accessToken) {
    throw new Error('Access token is required to fetch projects');
  }

  try {
    // Initialize the Asana client and authenticate using the access token
    const apiClient = new ApiClient();
    apiClient.authentications['token'].accessToken = accessToken;

    const projectsApi = new ProjectsApi(apiClient);
    const results = await projectsApi.getProjects();

    // If no projects are found, throw an error
    const projects = results.data;
    if (!projects || projects.length === 0) {
      throw new Error('No projects found for user');
    }

    console.log(`Fetched ${projects.length} projects`);

    // Return an array of project GIDs
    return projects.map((project) => project.gid);
  } catch (error) {
    console.error('Error fetching projects from Asana:', error.message);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
};

module.exports = { getAllProjects };
