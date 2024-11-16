import { fetchGuestApi } from "..";

export const getBlogListAPI = async (payload) => {
    try {
        const response = await fetchGuestApi.post("/blog/blog-list", payload);
        return response;
    } catch (error) {
        throw error;
    }
};