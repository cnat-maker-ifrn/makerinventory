import api from "./api";
import type { Emprestimo } from "../types/emprestimo";
import type { PaginatedResponse } from "../types/pagination";

/** Busca todos os empréstimos */
export async function getEmprestimos(
  page = 1,
  search = "",
  data_inicio = "",
  data_fim = ""
): Promise<PaginatedResponse<Emprestimo>> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  
  if (search) params.append("search", search);
  if (data_inicio) params.append("data_inicio", data_inicio);
  if (data_fim) params.append("data_fim", data_fim);

  const response = await api.get(`emprestimos/?${params.toString()}`);
  return response.data;
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
