
import { fetchGuestApi } from "..";
export const createPostApi = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/create-posts", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };

  //GET POST BY ID
  export const postByID = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-single-post", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };

    //UPDATE POST 
    export const updatePostByID = async (payload) => {
      try {
        const response = await fetchGuestApi.post("/classroom/update-posts", payload);
        return response;
      } catch (error) {
       
        throw error;
      }
    };