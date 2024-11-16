import { fetchApi } from "..";

export const getAiResistanAssignment = async (payload) => {
    try {
      const response = await fetchApi.post("/ai_resistant_assignments/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };