import { fetchGuestApi } from "..";

export const teachersListing = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-teacher-list", payload);
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const removeTeacher = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/remove-class-teacher", payload);
      return response;
    } catch (error) {
      throw error;
    }
  };