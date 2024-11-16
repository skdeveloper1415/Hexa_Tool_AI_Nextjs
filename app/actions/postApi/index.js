import {  fetchGuestApi } from "..";

export const PostListingApi = async (payload) => {
    try {
      const response = await fetchGuestApi.post("classroom/get-posts-list", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };