import { fetchGuestApi } from "..";

export const listOfActiveClassAPI = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/class-room-api", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };

