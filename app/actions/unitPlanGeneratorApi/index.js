import { fetchApi } from "..";

export const generateUnitPlanGeneratorAssignment = async (payload) => {
    try {
      const response = await fetchApi.post("/unit-plan-generator", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };