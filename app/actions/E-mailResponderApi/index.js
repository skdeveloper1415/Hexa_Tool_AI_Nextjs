import { fetchApi } from "..";

export const generateEmailResponder = async (payload) => {
    try {
      const response = await fetchApi.post("/email-responder/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };