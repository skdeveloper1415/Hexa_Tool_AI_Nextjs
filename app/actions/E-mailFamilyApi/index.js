import { fetchApi } from "..";

export const generateEmailFamily = async (payload) => {
    try {
      const response = await fetchApi.post("/family_email/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };