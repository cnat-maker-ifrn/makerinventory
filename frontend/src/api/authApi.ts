import api from "./api";

interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    matricula: string;
    nome: string;
    is_staff: boolean;
  };
}

export async function login(matricula: string, password: string): Promise<LoginResponse> {
  const response = await api.post("auth/login/", {
    matricula,
    password,
  });

  return response.data;
}
