import { fetchGuestApi } from "..";

export const createStudent = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/add-student", payload);
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const createTeacher = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/add-teacher", payload);
      return response;
    } catch (error) {
      throw error;
    }
  };