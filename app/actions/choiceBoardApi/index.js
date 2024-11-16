import { fetchApi } from "..";

export const generateChoiceBoard = async (payload) => {
    try {
      const response = await fetchApi.post("/choice-board/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };