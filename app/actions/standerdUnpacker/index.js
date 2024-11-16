import { fetchApi } from "..";

export const generateStanderdUnpackerApi = async (payload) => {
    try {
      const response = await fetchApi.post("/standard-unpacker/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };