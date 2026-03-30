import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Don't intercept refresh-token requests — prevents infinite loop
    const isRefreshRequest = originalRequest.url?.includes("/user/refresh-token");

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;
      try {
        const response = await api.get("/user/refresh-token");
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (_error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
