import { fetchApi } from "..";

export const generateMultiChoiceAssesmentApi = async (payload) => {
    try {
      const response = await fetchApi.post("/multi-choice-assessment/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };