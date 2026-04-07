import api from "./api";
import type { ProdutoUnificado } from "../types/produtounificado";

export async function getProdutosBaixoEstoque(): Promise<ProdutoUnificado[]> {
  const response = await api.get<ProdutoUnificado[]>("estoque-baixo/");
  return response.data;
}