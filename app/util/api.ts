import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://35.193.219.136:4040"
});

// Function to attach loading state (to be set inside a component)
export function setLoadingInterceptor(setLoading: (loading: boolean) => void) {
    api.interceptors.request.use(
        (config) => {
            setLoading(true);  // ✅ Set loading before request
            if (config.headers['X-Require-Auth'] === 'true') {
                const token = Cookies.get("token");
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            setLoading(false);  // ✅ Stop loading if request fails
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => {
            setLoading(false);  // ✅ Stop loading after response
            return response;
        },
        (error) => {
            setLoading(false);  // ✅ Stop loading if response fails
            return Promise.reject(error);
        }
    );
}

export default api;
