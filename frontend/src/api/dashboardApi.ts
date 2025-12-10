import api from "./api";

export async function getEntradasSaidas() {
  const resp = await api.get("movimentacoes/entradas-saidas-12m/");
  return resp.data;
}