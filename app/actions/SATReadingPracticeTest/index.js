import { fetchApi } from "..";

export const generateSATPracTestAPI = async () => {
    try {
      const response = await fetchApi.post("/sat_reading_practice_test", {});
      return response;
    } catch (error) {
     
      throw error;
    }
  };