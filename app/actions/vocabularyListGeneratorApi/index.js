import { fetchApi } from "..";

export const getVocabularyList = async (payload) => {
    try {
      const response = await fetchApi.post("/vocab-list-generator", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };