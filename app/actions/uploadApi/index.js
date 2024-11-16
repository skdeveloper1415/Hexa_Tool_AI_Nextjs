import { fetchApi } from "..";

export const uploadContentApi = async (payload) => {
    try {
      const response = await fetchApi.post("/googledrive-file-upload", payload);
      return response;
    } catch (error) {
      return error;
    }
  };

  export const uploadContentOneDriveApi = async (payload) => {
    try {
      const response = await fetchApi.post("/onedrive-file-upload", payload);
      return response;
    } catch (error) {
      return error;
    }
  };