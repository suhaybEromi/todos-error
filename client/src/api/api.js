import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// interceptor for token refresh
api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (
      err.response?.status === 401 &&
      err.response?.data?.message?.includes("Token expired") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await api.get("/auth/refresh"); // refresh cookie
        return api(originalRequest);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  },
);

export default api;
