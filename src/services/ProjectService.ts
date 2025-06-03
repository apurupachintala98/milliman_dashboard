import axios from "axios";

// Set your base URL
const Dashboard_BASE_URL = "http://localhost:5173";

const ProjectService = {
  getAllApiUpdates: async () => {
    try {
      const response = await axios.get(`${Dashboard_BASE_URL}/all/`);
      return response.status === 200 ? response.data : [];
    } catch (error) {
      console.error("Error fetching API:", error);
      return [];
    }
  },
};

export default ProjectService;