import { fetchApi } from "..";

export const generateMakeRelevant = async (payload) => {
    try {
        const response = await fetchApi.post("/generate-relevant/", payload);
        return response;
    } catch (error) {

        throw error;
    }
};