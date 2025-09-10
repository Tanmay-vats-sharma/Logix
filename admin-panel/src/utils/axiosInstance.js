import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_URL || "http://localhost:5000/api/admin",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
