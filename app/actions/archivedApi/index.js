import { fetchGuestApi } from "..";
export const ArchivedClass = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/class-room-api/archieve", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };

