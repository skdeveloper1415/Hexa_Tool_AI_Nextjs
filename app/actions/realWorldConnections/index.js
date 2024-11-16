import { fetchApi } from "..";

export const generateRealWorldConnectionAPI = async (payload) => {
    try {
      const response = await fetchApi.post("/real_world_connections", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };