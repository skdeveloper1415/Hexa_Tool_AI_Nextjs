import { fetchApi } from "..";

export const generateProfessionalEmail = async (payload) => {
    try {
      const response = await fetchApi.post("/professional_email", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };