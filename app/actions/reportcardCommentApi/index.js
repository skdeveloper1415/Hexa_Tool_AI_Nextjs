import { fetchApi } from "..";

export const getReportCardComment = async (payload) => {
    try {
      const response = await fetchApi.post("/report-card-comment", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };