import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.57:8000/api/", //apenas para teste, alterar dependendo do ip do pc
  withCredentials: false, // ou true se usar sessões/cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
// (Opcional) Interceptor para adicionar token automaticamente
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// (Opcional) Interceptor para tratar erros globalmente
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("Erro na API:", error);
//     return Promise.reject(error);
//   }
// );

export default api;
