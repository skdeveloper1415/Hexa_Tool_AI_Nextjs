import { fetchApi } from "..";

export const generateSocialStories = async (payload) => {
    try {
      const response = await fetchApi.post("/generate-social-stories", payload );
      return response;
    } catch (error) {
     
      return error;
    }
  };