import { fetchApi } from "..";

export const generateRestorativeReflections = async (payload) => {
    try {
      const response = await fetchApi.post("/restorative-reflection", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };