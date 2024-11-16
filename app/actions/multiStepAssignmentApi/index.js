import { fetchApi } from "..";

export const generateMultiStepAssignment = async (payload) => {
    try {
      const response = await fetchApi.post("/multi-step-assignment/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };