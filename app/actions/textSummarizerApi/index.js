import { fetchApi } from "..";

export const generateTextSummarizer = async (payload) => {
    try {
      const response = await fetchApi.post("/text-summarizer/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };