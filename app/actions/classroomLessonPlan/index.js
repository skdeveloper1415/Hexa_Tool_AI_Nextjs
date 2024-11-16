
import { fetchApi } from "..";

export const generateClassroomLessonPlanAPi = async (payload) => {
    try {
      const response = await fetchApi.post("/lesson-plan-generator/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };