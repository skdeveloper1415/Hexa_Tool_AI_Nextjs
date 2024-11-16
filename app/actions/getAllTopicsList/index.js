import { fetchApi, fetchGuestApi } from "..";

export const getTopicList = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-class-topics-list", payload);
      return response;
    } catch (error) {
      throw error;
    }
  };
export const deleteTopicApi = async (payload) => {
    try {
      // debugger
      console.log('fetchGuestApi', fetchGuestApi)
      const response = await fetchGuestApi.post("/classroom/topic/delete", payload);
      console.log('response', response)
      return response;
    } catch (error) {
      throw error;
    }
  };