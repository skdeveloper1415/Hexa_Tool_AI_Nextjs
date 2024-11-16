import { fetchApi } from "..";

export const generateConceptualUnderstanding = async (payload) => {
  try {
    const response = await fetchApi.post("/conceptual-understanding/", payload);
    return response;
  } catch (error) {

    throw error;
  }
};