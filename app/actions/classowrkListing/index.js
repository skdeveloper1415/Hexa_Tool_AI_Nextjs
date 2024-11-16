
import { fetchGuestApi } from "..";
export const classworkList = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-class-assignment-list", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };


  export const getAssignmentDetailsById = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-class-assignment-detail", payload);
      return response;
    } catch (error) {
      console.log(error,"errorerrorerrorerror")
      //throw error;
    }
  };
  export const createclassAssignment = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/create-class-assignment", payload);
      return response;
    } catch (error) {
      console.log(error,"error")
      //throw error;
    }
  };

  export const getGrades = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/grades-list", payload);
      return response;
    } catch (error) {
      console.log(error,"error")
      //throw error;
    }
  };

  export const getAssignment = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-class-assignment-detail", payload);
      return response;
    } catch (error) {
      console.log(error,"error")
      //throw error;
    }
  };
  
  export const deleteAssignmentAPI = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/delete-class-assignment", payload);
      return response;
    } catch (error) {
      console.log(error,"error")
      //throw error;
    }
  };

  export const UpdateAssignmentbyID = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/update-class-assignment", payload);
      return response;
    } catch (error) {
      console.log(error,"error")
      //throw error;
    }
  };