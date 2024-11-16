import { fetchGuestApi } from "..";

export const createTopicApi = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/topic/create", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };
export const updateTopicApi = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/topic/update", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };

  export const getTopicListApi = async (payload) => {
    try {
      const response = await fetchGuestApi.post("classroom/get-class-topics-list", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };