import { fetchApi } from "..";

export const generateDataTableAnalysisApi = async (payload) => {
    try {
      const response = await fetchApi.post("/data-table-analysis/", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };