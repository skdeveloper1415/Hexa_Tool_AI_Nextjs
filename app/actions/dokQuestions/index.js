import { fetchApi } from "..";

export const generateDokQuestions = async (payload) => {
    try {
      const response = await fetchApi.post("/dok-questions", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };