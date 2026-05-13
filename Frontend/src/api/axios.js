import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/rental-ps/Backend/api", // Sesuaikan dengan path folder PHP kamu
});

// Otomatis tempelkan token JWT jika ada di localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
