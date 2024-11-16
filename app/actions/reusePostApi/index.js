import { fetchGuestApi } from "..";

export const reusePostApi = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/teacher-class-list", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };         
  
  
  
  export const classListPostApi = async (payload) => {
              try {
                const response = await fetchGuestApi.post("/classroom/class-post-list", payload);
                return response;
              } catch (error) {
               
                throw error;
              }
            };  