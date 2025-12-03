import api from "./api";
import type { Solicitante } from "../types/solicitante";

export async function getSolicitantes(): Promise<Solicitante[]> {
  const resp = await api.get<Solicitante[]>("solicitantes/");
  return resp.data;
}

export async function getSolicitanteById(id: number): Promise<Solicitante> {
  const resp = await api.get<Solicitante>(`solicitantes/${id}/`);
  return resp.data;
}

export async function createSolicitante(data: {
  nome: string;
  matricula: string;
  telefone?: string | null;
}): Promise<Solicitante> {
  const resp = await api.post<Solicitante>("solicitantes/", data);
  return resp.data;
}

export async function updateSolicitante(
  id: number,
  data: {
    nome: string;
    matricula: string;
    telefone?: string | null;
  }
): Promise<Solicitante> {
  const resp = await api.put<Solicitante>(`solicitantes/${id}/`, data);
  return resp.data;
}

export async function deleteSolicitante(id: number): Promise<void> {
  await api.delete(`solicitantes/${id}/`);
}
