import axios from "axios";

const Dashboard_BASE_URL = "http://localhost:8000";

const ProjectService = {
  getAllApiUpdates: async () => {
    try {
      const response = await axios.get(`${Dashboard_BASE_URL}/all/`);

      if (response.status === 200 && typeof response.data === 'object') {
        return {
          getToken: response.data.get_token,
          mcidSearch: response.data.mcid_search,
          medicalSubmit: response.data.medical_submit,
        };
      } else {
        return {
          getToken: null,
          mcidSearch: null,
          medicalSubmit: null,
        };
      }
    } catch (error) {
      console.error("Error fetching API:", error);
      return {
        getToken: null,
        mcidSearch: null,
        medicalSubmit: null,
      };
    }
  },
};

export default ProjectService;
