import api from "./api";
import type { Movimentacao } from "../types/movimentacao";
import type { PaginatedResponse } from "../types/pagination";

export async function getMovimentacoes(
  page = 1,
  search = "",
  data_inicio = "",
  data_fim = ""
): Promise<PaginatedResponse<Movimentacao>> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  
  if (search) params.append("search", search);
  if (data_inicio) params.append("data_inicio", data_inicio);
  if (data_fim) params.append("data_fim", data_fim);

  const resp = await api.get<PaginatedResponse<Movimentacao>>(
    `movimentacoes/?${params.toString()}`
  );
  return resp.data;
}


