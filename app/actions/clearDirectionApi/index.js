import { fetchApi } from "..";

export const generateClearDirection = async (payload) => {
    try {
      const response = await fetchApi.post("/clear-directions", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };