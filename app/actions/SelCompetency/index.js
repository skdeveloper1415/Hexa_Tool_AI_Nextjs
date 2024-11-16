import { fetchApi } from "..";

export const generateSelComptencyAPI = async (payload) => {
    try {
      const response = await fetchApi.post("/sel-lesson-plan", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };