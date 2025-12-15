import api from "./api";

export async function getEntradasSaidas() {
  const resp = await api.get("movimentacoes/entradas-saidas-12m/");
  return resp.data;
}

export async function getLotesMaisUsados() {
  const resp = await api.get("lotes/mais-usados/");
  return resp.data;
}