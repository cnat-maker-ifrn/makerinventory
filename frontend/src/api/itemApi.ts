import api from "./api";
import { type Item } from "../types/item";
import type { PaginatedResponse } from "../types/pagination";

/** Busca todos os itens */
export async function getItens(
  page = 1
): Promise<PaginatedResponse<Item>> {
  const response = await api.get<PaginatedResponse<Item>>(
    `itens/?page=${page}`
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
