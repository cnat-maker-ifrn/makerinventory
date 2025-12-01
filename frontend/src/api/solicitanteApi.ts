import api from "./api";

export interface SolicitantePayload {
  nome: string;
  matricula: string;
  telefone?: string | null;
}

export async function getSolicitantes() {
  const resp = await api.get("solicitantes/");
  return resp.data;
}

export async function getSolicitanteById(id: number) {
  const resp = await api.get(`solicitantes/${id}/`);
  return resp.data;
}

export async function createSolicitante(data: SolicitantePayload) {
  const resp = await api.post("solicitantes/", data);
  return resp.data;
}

export async function updateSolicitante(id: number, data: SolicitantePayload) {
  const resp = await api.put(`solicitantes/${id}/`, data);
  return resp.data;
}

export async function deleteSolicitante(id: number) {
  await api.delete(`solicitantes/${id}/`);
}
