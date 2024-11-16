import { fetchApi } from "..";

export const generateCoachSportsPracticesAPI = async (payload) => {
    try {
      const response = await fetchApi.post("/coach-sports-practise", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };