
import { fetchGuestApi } from "..";

export const questionListApi = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-class-question-list", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  }

  export const questionUpdateApi = async (payload) => {
              try {
                const response = await fetchGuestApi.post("/classroom/update-class-question", payload);
                return response;
              } catch (error) {
               
                throw error;
              }
            }

export const questionCreateApi = async (payload) => {
              try {
                const response = await fetchGuestApi.post("/classroom/create-class-question", payload);
                return response;
              } catch (error) {
               
                throw error;
              }
            }


            export const questionGetByIdApi = async (payload) => {
              try {
                const response = await fetchGuestApi.post("/classroom/get-class-question-details", payload);
                return response;
              } catch (error) {
               
                throw error;
              }
            }

            export const questionDeleteApi = async (payload) => {
              try {
                const response = await fetchGuestApi.post("/classroom/delete-class-question", payload);
                return response;
              } catch (error) {
               
                throw error;
              }
            }