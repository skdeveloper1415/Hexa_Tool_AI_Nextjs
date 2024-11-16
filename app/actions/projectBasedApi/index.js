import { fetchApi } from "..";

export const generateProjectBasedApi = async (payload) => {
    try {
      const response = await fetchApi.post("/project-based-learning/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };