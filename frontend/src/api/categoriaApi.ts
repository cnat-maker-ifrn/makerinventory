import api from "./api"; 
import { type Categoria } from "../types/categoria";


/** Busca todas as categorias */
export async function getCategorias(): Promise<Categoria[]> {
  const response = await api.get("categorias/");
  
  // Lidar com resposta que pode ser array ou PaginatedResponse
  if (Array.isArray(response.data)) {
    return response.data;
  }
  
  // Se for PaginatedResponse, extrair results
  return response.data.results || [];
}

/** Cria uma nova categoria */
export async function createCategoria(nome: string): Promise<Categoria> {
  const response = await api.post("categorias/", { nome });
  return response.data;
}

/** Deleta uma categoria pelo ID */
export async function deleteCategoria(id: number): Promise<void> {
  await api.delete(`categorias/${id}/`);
}

/** Atualiza uma categoria pelo ID */
export async function updateCategoria(id: number, nome: string): Promise<Categoria> {
  const response = await api.put(`categorias/${id}/`, { nome });
  return response.data;
}
