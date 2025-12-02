import api from "./api"; 

export async function getMovimentacoes() {
  const resp = await api.get("movimentacoes/");
  return resp.data;
}
