import api from "./api";

export async function getProdutosUnitarios() {
  const resp = await api.get("produtos-unitarios/");
  return resp.data;
}

export async function getProdutosFracionados() {
  const resp = await api.get("produtos-fracionados/");
  return resp.data;
}

export async function createProdutoUnitario(data: FormData) {
  const resp = await api.post("produtos-unitarios/", data);
  return resp.data;
}

export async function createProdutoFracionado(data: FormData) {
  const resp = await api.post("produtos-fracionados/", data);
  return resp.data;
}
