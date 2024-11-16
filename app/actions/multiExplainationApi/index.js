import { fetchApi } from "..";

export const generateMultiExplainationApi = async (payload) => {
    try {
      const response = await fetchApi.post("/generate-multiple-explanations/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };