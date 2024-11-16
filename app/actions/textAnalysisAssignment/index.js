import { fetchApi } from "..";

export const getTextAnalysisAssignment = async (payload) => {
    try {
      const response = await fetchApi.post("/text-analysis-assignment/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };