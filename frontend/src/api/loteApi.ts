import api from "./api";
import type { PaginatedResponse } from "../types/pagination";

export async function getLotes(page = 1): Promise<PaginatedResponse<any>> {
  const resp = await api.get(`lotes/?page=${page}`);
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
