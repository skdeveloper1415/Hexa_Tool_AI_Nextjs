import { fetchApi } from "..";

export const generateTextDependentQuestions = async (payload) => {
  try {
    const response = await fetchApi.post(
      "/text-dependencies-question/",
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
};