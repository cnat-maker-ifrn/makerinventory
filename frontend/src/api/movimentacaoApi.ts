import api from "./api";
import type { Movimentacao } from "../types/movimentacao";
import type { PaginatedResponse } from "../types/pagination";

export async function getMovimentacoes(
  page = 1
): Promise<PaginatedResponse<Movimentacao>> {
  const resp = await api.get<PaginatedResponse<Movimentacao>>(
    `movimentacoes/?page=${page}`
  );
  return resp.data;
}


