import axios from "axios";
import { toast } from 'react-toastify';
const AUTH_API_URL = process.env.NEXT_PUBLIC_BASE_AUTH_URL;
const GUEST_API_URL = process.env.NEXT_PUBLIC_BASE_CLASSROOM_URL;

const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;
let cancelTokenSource = axios.CancelToken.source();
let cancelTokenForGuestAPI = axios.CancelToken.source();
const fetchApi = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    "Authorization": `Bearer ${AUTH_TOKEN}`
  },

});
const cancelPendingRequests = () => {
  cancelTokenSource.cancel('Operation canceled by the user.');
  cancelTokenSource = axios.CancelToken.source();
  cancelTokenForGuestAPI.cancel('Operation canceled by the System')
  cancelTokenForGuestAPI = axios.CancelToken.source();
};



const fetchGuestApi = axios.create({
  baseURL: GUEST_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

fetchGuestApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
  };
  config.cancelToken = cancelTokenForGuestAPI.token;
  return config;
});

fetchGuestApi.interceptors.response.use(
  function (response) {
    return response?.data;
  },
  function (error) {
    
    if (error && error?.response?.data) {
      const data = error.response.data;
      if (data.code == 401) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
      }
      else if (error.response.data.message == "Invalid Credentials") {

        localStorage.clear();
        sessionStorage.clear();
        toast.error("Session Expired", { autoClose: "3000" })
        window.location.href = "/";
        cancelPendingRequests()
      }

      return data;
    }
    return error?.response?.data ?? error;
  }
);

fetchApi.interceptors.request.use(
  (config) => {
    // Set the cancel token for each request
    config.cancelToken = cancelTokenSource.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { fetchApi, fetchGuestApi, cancelPendingRequests };