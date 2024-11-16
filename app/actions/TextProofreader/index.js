import { fetchApi } from "..";

export const generateTextProofreader = async (payload) => {
    try {
      const response = await fetchApi.post("/text-proofreader/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };