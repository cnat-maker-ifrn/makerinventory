import api from "./api";
import { type Devolucao } from "../types/devolucao";

/** Lista todas as devoluções */
export async function getDevolucoes(): Promise<Devolucao[]> {
  const response = await api.get("devolucoes/");
  return response.data;
}

/** Busca uma devolução específica pelo ID */
export async function getDevolucao(id: number): Promise<Devolucao> {
  const response = await api.get(`devolucoes/${id}/`);
  return response.data;
}

/** Cria uma nova devolução */
export async function createDevolucao(data: {
  emprestimo: number;
  itens: number[];
  observacao?: string | null;
}): Promise<Devolucao> {
  const response = await api.post("devolucoes/", data);
  return response.data;
}

/** Atualiza uma devolução pelo ID */
export async function updateDevolucao(
  id: number,
  data: {
    emprestimo?: number;
    itens?: number[];
    observacao?: string | null;
  }
): Promise<Devolucao> {
  const response = await api.put(`devolucoes/${id}/`, data);
  return response.data;
}

/** Deleta uma devolução pelo ID */
export async function deleteDevolucao(id: number): Promise<void> {
  await api.delete(`devolucoes/${id}/`);
}
