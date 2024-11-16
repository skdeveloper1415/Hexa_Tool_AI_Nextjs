import { fetchGuestApi } from "..";

export const listOfStudent = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-student-list", payload);
      return response;
    } catch (error) {
      throw error;
    }
  };
export const removeStudent = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/remove-class-student", payload);
      return response;
    } catch (error) {
      throw error;
    }
  };

