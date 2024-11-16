import { fetchGuestApi } from "..";

//Get List
export const getMaterials = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-class-material-list", payload);
      return response;
    } catch (error) {
      throw error;
    }
  };

  //Create Material
  export const createMaterial = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/create-class-material", payload);
      return response;
    } catch (error) {
      throw error;
    }
  };

  //get Material by id
  export const getMaterialById = async (payload) => {
    try {
      const response = await fetchGuestApi.post("/classroom/get-class-material-details", payload);
      return response;
    } catch (error) {
      throw error;
    }
  };

    //Update material
    export const updateMaterial = async (payload) => {
      try {
        const response = await fetchGuestApi.post("/classroom/update-class-material", payload);
        return response;
      } catch (error) {
        throw error;
      }
    };

        //Delete material
        export const deleteMaterial = async (payload) => {
          try {
            const response = await fetchGuestApi.post("/classroom/delete-class-material", payload);
            return response;
          } catch (error) {
            throw error;
          }
        };