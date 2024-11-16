import { fetchApi } from "..";

export const generateStudentWorkFeedbackAPI = async (payload) => {
    try {
      const response = await fetchApi.post("/student_feedback", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };