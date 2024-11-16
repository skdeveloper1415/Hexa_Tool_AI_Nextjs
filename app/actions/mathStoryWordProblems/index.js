import { fetchApi } from "..";

export const generateMathStoryWordProblemAPI = async (payload) => {
    try {
      const response = await fetchApi.post("/math-story-word-problems", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };