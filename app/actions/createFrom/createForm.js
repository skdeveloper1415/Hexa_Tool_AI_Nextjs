import { fetchGuestApi } from "..";

export const createFormApi = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/create-form", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  }
export const getgoogleFormApi = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-form-question", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  }
export const getgoogleFormQueAndAnsApi = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-form-question-answer", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  }