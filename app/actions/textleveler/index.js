import { fetchApi } from "..";

export const generateTextLeveler = async (payload) => {
    try {
      const response = await fetchApi.post("/text-leveler/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };