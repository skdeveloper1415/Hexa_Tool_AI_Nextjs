import { fetchApi } from "..";

export const getVocabulayBasedTextApi = async (payload) => {
    try {
      const response = await fetchApi.post("/vocabulary-based-text", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };