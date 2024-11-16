import { fetchGuestApi } from "..";

export const fetchCalendarList = async (payload) => {
    try {
        const response = await fetchGuestApi.post("/calendar/calendar-list/", payload);
        return response;
    } catch (error) {

        throw error;
    }
};



export const fetchEventList = async (payload) => {
    try {
        const response = await fetchGuestApi.post("/calendar/events-list/", payload);
        return response;
    } catch (error) {

        throw error;
    }
};

export const fetchEventById = async (payload) => {
    try {
        const response = await fetchGuestApi.post("/calendar/events-show/", payload);
        return response;
    } catch (error) {

        throw error;
    }
};





export const createEventApi = async (payload) => {
    try {
        const response = await fetchGuestApi.post("/calendar/events-create/", payload);
        return response;
    } catch (error) {

        throw error;
    }
};