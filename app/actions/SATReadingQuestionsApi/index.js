import { fetchApi } from "..";

export const generateSATReadingQuestions = async (payload) => {
    try {
      const response = await fetchApi.post("/sat-reading-questions/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };