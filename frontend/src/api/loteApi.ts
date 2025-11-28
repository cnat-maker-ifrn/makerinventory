import api from "./api"

export async function getLotes() {
  const resp = await api.get("lotes/")
  return resp.data
}

export async function getLoteById(id: number) {
  const resp = await api.get(`lotes/${id}/`)
  return resp.data
}

export async function createLote(data: any) {
  const resp = await api.post("lotes/", data)
  return resp.data
}

export async function updateLote(id: number, data: any) {
  const resp = await api.put(`lotes/${id}/`, data)
  return resp.data
}

export async function deleteLote(id: number) {
  await api.delete(`lotes/${id}/`)
}
