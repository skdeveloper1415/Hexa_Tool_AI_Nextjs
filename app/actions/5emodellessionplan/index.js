import { fetchApi } from "..";

export const generate5EModelLessionPlanAPI = async (payload) => {
    try {
      const response = await fetchApi.post("/five-e-model-lesson-plan", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };