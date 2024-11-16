import { fetchApi } from "..";

export const generateScienceLabApi = async (payload) => {
    try {
      const response = await fetchApi.post("/science_labs/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };