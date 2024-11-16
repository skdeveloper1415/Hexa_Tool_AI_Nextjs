import { fetchApi, fetchGuestApi } from "..";

export const getTopicList = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-class-topics-list", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };