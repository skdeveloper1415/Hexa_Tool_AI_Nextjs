
import { fetchApi } from "..";

export const generateLessonPlanAPi = async (payload) => {
    try {
      const response = await fetchApi.post("/lesson-plan-generator/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };