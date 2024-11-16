import { fetchApi } from "..";

export const generateRubricAPI = async (payload) => {
    try {
      const response = await fetchApi.post("/rubric-data", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };