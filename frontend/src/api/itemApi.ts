import api from "./api";

export async function getItens() {
  const resp = await api.get("itens/");
  return resp.data;
}

export async function getItemById(id: number) {
  const resp = await api.get(`itens/${id}/`);
  return resp.data;
}

export async function createItem(data: FormData) {
  const resp = await api.post("itens/", data);
  return resp.data;
}

export async function updateItem(id: number, data: FormData) {
  const resp = await api.put(`itens/${id}/`, data);
  return resp.data;
}

export async function deleteItem(id: number) {
  await api.delete(`itens/${id}/`);
}
