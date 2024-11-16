import { fetchApi } from "..";

export const generateAcademicContentApi = async (payload) => {
    try {
      const response = await fetchApi.post("/academic-content/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };