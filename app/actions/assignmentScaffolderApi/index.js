import { fetchApi } from "..";

export const assignmentScaffolder = async (payload) => {
    try {
      const response = await fetchApi.post("/assignment-scaffolder", payload);
      return response;
    } catch (error) {
     
      return error;
    }
  };