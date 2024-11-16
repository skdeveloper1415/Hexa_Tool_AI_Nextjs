import { fetchGuestApi } from "..";

export const listOfMathsClass = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/class-room-api/id", payload);
      return response;
    } catch (error) {
      throw error;
    }
  };

