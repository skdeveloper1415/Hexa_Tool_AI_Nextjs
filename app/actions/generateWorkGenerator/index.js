import { fetchApi } from "..";

export const generateWorkGenerator = async (payload) => {
    try {
      const response = await fetchApi.post("/generate-group-work/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };