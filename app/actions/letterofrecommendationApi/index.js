import { fetchApi } from "..";

export const generateLetterOfRecommendationAPI = async (payload) => {
    try {
      const response = await fetchApi.post("/letter-of-recommendation", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };