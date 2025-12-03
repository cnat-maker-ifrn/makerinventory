import api from "./api";
import type { Movimentacao } from "../types/movimentacao"; // ajusta o path conforme sua estrutura

/** Busca todas as movimentações de estoque */
export async function getMovimentacoes(): Promise<Movimentacao[]> {
  const resp = await api.get<Movimentacao[]>("movimentacoes/");
  return resp.data;
}
