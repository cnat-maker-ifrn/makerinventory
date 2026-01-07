import api from "./api";
import type { Emprestimo } from "../types/emprestimo";

/** Busca todos os empréstimos */
export async function getEmprestimos(): Promise<Emprestimo[]> {
  const response = await api.get("emprestimos/");
  
  // Lidar com resposta que pode ser array ou PaginatedResponse
  if (Array.isArray(response.data)) {
    return response.data;
  }
  
  // Se for PaginatedResponse, extrair results
  return response.data.results || [];
}

/** Busca um empréstimo pelo ID */
export async function getEmprestimoById(id: number): Promise<Emprestimo> {
  const response = await api.get<Emprestimo>(`emprestimos/${id}/`);
  return response.data;
}

/** Cria um novo empréstimo */
export async function createEmprestimo(data: {
  solicitante: number;
  itens: number[];
  previsao_entrega: string;
  responsavel: string;
}): Promise<Emprestimo> {
  const resp = await api.post<Emprestimo>("emprestimos/", data); // JSON
  return resp.data;
}
/** Atualiza um empréstimo pelo ID */
export async function updateEmprestimo(id: number, data: any): Promise<Emprestimo> {
  const response = await api.put<Emprestimo>(`emprestimos/${id}/`, data);
  return response.data;
}

/** Deleta um empréstimo pelo ID */
export async function deleteEmprestimo(id: number): Promise<void> {
  await api.delete(`emprestimos/${id}/`);
}
