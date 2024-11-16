import { fetchApi } from "..";

export const exampleNonExampleApi = async (payload) => {
    try {
      const response = await fetchApi.post("/example-non-example/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };