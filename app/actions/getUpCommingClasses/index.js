import { fetchGuestApi } from "..";

export const getUpcommingClasses = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/upcoming-assignments", payload);
      return response;
    } catch (error) {
      throw error;
    }
  };