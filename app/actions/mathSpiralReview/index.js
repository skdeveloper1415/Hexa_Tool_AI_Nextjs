import { fetchApi } from "..";

export const generateMathSpiralReview = async (payload) => {
    try {
      const response = await fetchApi.post("/math_spiral_review", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };