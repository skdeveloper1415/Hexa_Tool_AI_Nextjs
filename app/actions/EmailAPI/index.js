import { fetchGuestApi } from "..";

export const getEmailListAPI = async (payload) => {
    try {
        const response = await fetchGuestApi.post("/classroom/email/list", payload);
        return response;
    } catch (error) {
        throw error;
    }
};

export const sendEmailAPI = async (payload) => {
    try {
        const response = await fetchGuestApi.post("/classroom/email/compose", payload);
        return response;
    } catch (error) {
        throw error;
    }
};