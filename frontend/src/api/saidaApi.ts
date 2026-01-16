import api from "./api";
import type { Saida } from "../types/saida";
import type { PaginatedResponse } from "../types/pagination";

/** Busca todas as saídas */
export async function getSaidas(
  page = 1,
  search = "",
  data_inicio = "",
  data_fim = ""
): Promise<PaginatedResponse<Saida>> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  
  if (search) params.append("search", search);
  if (data_inicio) params.append("data_inicio", data_inicio);
  if (data_fim) params.append("data_fim", data_fim);

  const response = await api.get<PaginatedResponse<Saida>>(
    `saidas/?${params.toString()}`
  );
  return response.data;
}

/** Busca uma saída pelo ID */
export async function getSaidaById(id: number): Promise<Saida> {
  const response = await api.get<Saida>(`saidas/${id}/`);
  return response.data;
}

/** Cria uma nova saída */
export async function createSaida(data: {
  item: number;
  quantidade: number;
  responsavel: string;
  data_saida: string; // datetime ISO
}): Promise<Saida> {
  const response = await api.post<Saida>("saidas/", data);
  return response.data;
}

/** Atualiza uma saída pelo ID */
export async function updateSaida(id: number, data: Partial<Saida>): Promise<Saida> {
  const response = await api.put<Saida>(`saidas/${id}/`, data);
  return response.data;
}

/** Deleta uma saída */
export async function deleteSaida(id: number): Promise<void> {
  await api.delete(`saidas/${id}/`);
}
