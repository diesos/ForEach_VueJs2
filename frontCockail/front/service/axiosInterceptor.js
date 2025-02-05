import axios from "axios";
import router from "./router";
import apiUrl from "../constant/constant.js";
import jwtDecode from "jwt-decode";


const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Vérifie si `exp` est passé
  } catch (error) {
    return true; // Si erreur, considère que le token est invalide
  }
};

const api = axios.create({
  baseURL: apiUrl ,
  headers: { "Content-Type": "application/json"}
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenExpired()) {
        console.log("🔴 Token expiré, suppression !");
        localStorage.removeItem("token");
        router.push("/login");
        return Promise.reject(new Error("Token expiré"));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response, // Si la réponse est OK, on la retourne
  (error) => {
    if (error.response?.status === 401) {
      console.log("🔴 Token invalide ou utilisateur non authentifié");
      localStorage.removeItem("token");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
