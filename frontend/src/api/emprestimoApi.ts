import api from "./api";

export interface CreateEmprestimoPayload {
  solicitante: number; // id do solicitante
  previsao_entrega: string;
  itens: number[]; // ids dos itens emprestados
}

export async function getEmprestimos() {
  const resp = await api.get("emprestimos/");
  return resp.data;
}

export async function getEmprestimoById(id: number) {
  const resp = await api.get(`emprestimos/${id}/`);
  return resp.data;
}

export async function createEmprestimo(data: CreateEmprestimoPayload) {
  const resp = await api.post("emprestimos/", data);
  return resp.data;
}

export async function updateEmprestimo(id: number, data: Partial<CreateEmprestimoPayload>) {
  const resp = await api.put(`emprestimos/${id}/`, data);
  return resp.data;
}

export async function deleteEmprestimo(id: number) {
  await api.delete(`emprestimos/${id}/`);
}
