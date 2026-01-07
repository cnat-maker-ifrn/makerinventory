import api from "./api";
import type { ProdutoUnitario } from "../types/produtounitario";
import type { ProdutoFracionado } from "../types/produtofracionado";
import type { PaginatedResponse } from "../types/pagination";

export async function createProdutoUnitario(data: FormData) {
  const resp = await api.post("produtos-unitarios/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return resp.data;
}

export async function createProdutoFracionado(data: FormData) {
  const resp = await api.post("produtos-fracionados/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return resp.data;
}

export async function getProdutosUnitarios(
  page = 1
): Promise<PaginatedResponse<ProdutoUnitario>> {
  const resp = await api.get(`produtos-unitarios/?page=${page}`);
  return resp.data;
}

export async function getProdutosFracionados(
  page = 1
): Promise<PaginatedResponse<ProdutoFracionado>> {
  const resp = await api.get(`produtos-fracionados/?page=${page}`);
  return resp.data;
}

export async function updateProdutoUnitario(id: number, data: FormData) {
  const resp = await api.patch(`produtos-unitarios/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return resp.data;
}

export async function updateProdutoFracionado(id: number, data: FormData) {
  const resp = await api.patch(`produtos-fracionados/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return resp.data;
}