import { fetchApi } from "..";

export const behaviorInterventionSuggestions = async (payload) => {
    try {
      const response = await fetchApi.post("/behavior_intervention_suggestion", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };