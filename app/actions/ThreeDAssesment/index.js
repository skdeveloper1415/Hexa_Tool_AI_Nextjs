import { fetchApi } from "..";

export const generateThreeDSciAPI = async (payload) => {
    try {
      const response = await fetchApi.post("/3d-science-assignment", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };