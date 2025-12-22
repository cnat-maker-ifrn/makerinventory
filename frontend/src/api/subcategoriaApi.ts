import type { Subcategoria } from "../types/subcategoria";
import api from "./api";

/** Busca todas as subcategorias */
export async function getSubcategorias(): Promise<Subcategoria[]> {
  const response = await api.get("subcategorias/");
  
  // Lidar com resposta que pode ser array ou PaginatedResponse
  if (Array.isArray(response.data)) {
    return response.data;
  }
  
  // Se for PaginatedResponse, extrair results
  return response.data.results || [];
}

/** Cria uma nova subcategoria */
export async function createSubcategoria(data: {
  nome: FormDataEntryValue | null;
  categoria: FormDataEntryValue | null;
}): Promise<Subcategoria> {
  if (!data.nome || !data.categoria) {
    throw new Error("Nome e categoria são obrigatórios");
  }

  const response = await api.post("subcategorias/", {
    nome: data.nome,
    categoria: data.categoria,
  });

  return response.data;
}
