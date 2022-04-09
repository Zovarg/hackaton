import axios from "axios";
import Cookies from "js-cookie";
import api from "../index";

const axiosInstance = axios.create({
  baseURL: "http://10.2.0.53:3000/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get("access-token");
    if (authToken) {
      config.headers.authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
    (config) => {

    return config;
},async (error) => {

    if (error.response.status == 401) {
       const refreshToken = Cookies.get("refresh-token");
       const request={'refresh':refreshToken}
       const {data:loginData} = await api.auth.updateToken(request);
       Cookies.set("access-token", loginData.access);
    }
})


export default axiosInstance;
