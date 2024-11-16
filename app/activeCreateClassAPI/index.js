import { fetchGuestApi } from "../actions";

export const CreateActiveClassAPI = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/class-room-api/create", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };
export const updateActiveClassAPI = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/class-room-api/update", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };
  
