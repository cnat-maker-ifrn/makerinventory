import api from "./api";
import type { Saida } from "../types/saida";

/** Busca todas as saídas */
export async function getSaidas(): Promise<Saida[]> {
  const response = await api.get<Saida[]>("saidas/");
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
