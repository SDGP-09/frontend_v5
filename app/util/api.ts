import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://35.193.219.136:4040"
});

api.interceptors.request.use(
    (config) => {


        if (config.headers['X-Require-Auth'] === 'true') {

            const token = Cookies.get("token");
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;