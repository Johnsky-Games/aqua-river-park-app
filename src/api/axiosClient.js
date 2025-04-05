import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

// ✅ Interceptor sin usar AxiosRequestConfig directamente
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!config.headers) config.headers = {};
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
