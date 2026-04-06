import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/", //apenas para teste, alterar dependendo do ip do pc
  withCredentials: false, // ou true se usar sessões/cookies
});

// Flag para evitar múltiplas tentativas de refresh simultâneas
let isRefreshing = false;
let failedQueue: Array<{
  onSuccess: (token: string) => void;
  onFailed: (error: unknown) => void;
}> = [];

const processQueue = (
  error: unknown,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.onSuccess(token);
    } else {
      prom.onFailed(error);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor para renovar token automaticamente quando expirar (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Se já está tentando refresh, adiciona à fila
        return new Promise((resolve, reject) => {
          failedQueue.push({
            onSuccess: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            onFailed: (err) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refresh = localStorage.getItem("refresh");

        if (!refresh) {
          // Sem refresh token, faz logout
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const response = await axios.post(
          "http://localhost:8000/api/auth/refresh/",
          { refresh },
          { withCredentials: false }
        );

        const { access } = response.data;

        // Salva o novo token
        localStorage.setItem("access", access);

        // Atualiza a configuração com o novo token
        originalRequest.headers.Authorization = `Bearer ${access}`;

        processQueue(null, access);
        isRefreshing = false;

        // Repete a requisição original
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;

        // Remove dados de autenticação e redireciona para login
        localStorage.clear();
        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
