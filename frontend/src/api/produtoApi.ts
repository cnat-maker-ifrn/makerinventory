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
  page = 1,
  search = ""
): Promise<PaginatedResponse<ProdutoUnitario>> {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    
    if (search) params.append("search", search);

    const resp = await api.get(`produtos-unitarios/?${params.toString()}`);
    return resp.data;
  } catch (e: any) {
    console.error("Erro ao buscar produtos unitários página", page, ":", e.response?.status, e.response?.data);
    // Retornar resposta vazia em caso de erro
    return { count: 0, next: null, previous: null, results: [] };
  }
}

export async function getProdutosFracionados(
  page = 1,
  search = ""
): Promise<PaginatedResponse<ProdutoFracionado>> {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    
    if (search) params.append("search", search);

    const resp = await api.get(`produtos-fracionados/?${params.toString()}`);
    return resp.data;
  } catch (e: any) {
    console.error("Erro ao buscar produtos fracionados página", page, ":", e.response?.status, e.response?.data);
    // Retornar resposta vazia em caso de erro
    return { count: 0, next: null, previous: null, results: [] };
  }
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