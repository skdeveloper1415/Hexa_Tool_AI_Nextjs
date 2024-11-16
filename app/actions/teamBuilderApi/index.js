import { fetchApi } from "..";

export const teamBuilderAPI = async (payload) => {
    try {
      const response = await fetchApi.post("/generate-team-builder", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };