import api from "./api";
import type { PaginatedResponse } from "../types/pagination";

export async function getLotes(
  page = 1,
  search = "",
  data_inicio = "",
  data_fim = ""
): Promise<PaginatedResponse<any>> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  
  if (search) params.append("search", search);
  if (data_inicio) params.append("data_inicio", data_inicio);
  if (data_fim) params.append("data_fim", data_fim);

  const resp = await api.get(`lotes/?${params.toString()}`);
  return resp.data;
}

export async function getLoteById(id: number) {
  const resp = await api.get(`lotes/${id}/`)
  return resp.data
}

export async function createLote(data: any) {
  const resp = await api.post("lotes/", data)
  return resp.data
}

export async function updateLote(id: number, data: any) {
  const resp = await api.patch(`lotes/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return resp.data
}

export async function deleteLote(id: number) {
  await api.delete(`lotes/${id}/`)
}
