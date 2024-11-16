import { fetchApi } from "..";

export const getCommonMissConception = async (payload) => {
    try {
      const response = await fetchApi.post("/common-misconceptions/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };