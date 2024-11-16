import { fetchApi } from "..";

export const generateSyllabusGeneratorApi = async (payload) => {
    try {
      const response = await fetchApi.post("/syllabus_generator/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };