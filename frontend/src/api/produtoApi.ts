import api from "./api";
import type { ProdutoUnitario } from "../types/produtounitario";  
import type { ProdutoFracionado } from "../types/produtofracionado";

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

export async function getProdutosUnitarios(): Promise<ProdutoUnitario[]> {
  const resp = await api.get("produtos-unitarios/");
  return resp.data;
}

export async function getProdutosFracionados(): Promise<ProdutoFracionado[]> {
  const resp = await api.get("produtos-fracionados/");
  return resp.data;
}