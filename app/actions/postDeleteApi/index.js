import {  fetchGuestApi } from "..";

export const PostDeleteApi = async (payload) => {
    try {
      const response = await fetchGuestApi.post("classroom/delete-single-post", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };