import api from "./api";
import { type Item } from "../types/item";
import type { PaginatedResponse } from "../types/pagination";

/** Busca todos os itens */
export async function getItens(
  page = 1,
  search = "",
  data_inicio = "",
  data_fim = ""
): Promise<PaginatedResponse<Item>> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  
  if (search) params.append("search", search);
  if (data_inicio) params.append("data_inicio", data_inicio);
  if (data_fim) params.append("data_fim", data_fim);

  const response = await api.get<PaginatedResponse<Item>>(
    `itens/?${params.toString()}`
  );
  return response.data;
}

/** Busca um item pelo ID */
export async function getItemById(id: number): Promise<Item> {
  const response = await api.get(`itens/${id}/`);
  return response.data;
}

/** Cria um novo item */
export async function createItem(data: FormData): Promise<Item> {
  const response = await api.post("itens/", data);
  return response.data;
}

/** Atualiza um item pelo ID */
export async function updateItem(id: number, data: FormData): Promise<Item> {
  const response = await api.patch(`itens/${id}/`, data);
  return response.data;
}

/** Deleta um item pelo ID */
export async function deleteItem(id: number): Promise<void> {
  await api.delete(`itens/${id}/`);
}
