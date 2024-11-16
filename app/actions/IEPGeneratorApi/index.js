import { fetchApi } from "..";

export const generateIEPGenerator = async (payload) => {
    try {
      const response = await fetchApi.post("/iep-generator/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };