import { fetchGuestApi } from "..";

export const createAssignmentQuizApi = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/create-quiz", payload);
      return response;
    } catch (error) {
     
      throw error;
    }
  };


  //Edit Quiz- Get quiz by Id 
  export const getQuizAssignment = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-class-quiz-id", payload);
      return response;
    } catch (error) {
      console.log(error,"error")
      throw error;
    }
  };

    //Edit Quiz 
    export const updateQuizAssignment = async (payload) => {
      try {
        const response = await fetchGuestApi.post("/classroom/update-quiz-assignment", payload);
        return response;
      } catch (error) {
        console.log(error,"error")
        throw error;
      }
    };

    export const deletequizApi = async (payload) => {
      try {
        const response = await fetchGuestApi.post("/classroom/delete-quiz-assignment", payload);
        return response;
      } catch (error) {
       
        throw error;
      }
    }

    export const quizListApi = async (payload) => {
      try {
        const response = await fetchGuestApi.post("/classroom/get-class-quiz-list", payload);
        return response;
      } catch (error) {
       
        throw error;
      }
    }