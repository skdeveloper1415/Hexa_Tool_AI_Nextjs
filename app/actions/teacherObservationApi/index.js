import { fetchApi } from "..";

export const generateTeacherObservation = async (payload) => {
    try {
      const response = await fetchApi.post("/teacher-observation/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };