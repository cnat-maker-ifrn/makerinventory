import type { Categoria } from "./categoriaApi";
import api from "./api";

export interface Subcategoria {
  id: number;
  nome: string;
  categoria: Categoria;
}

/** Busca todas as subcategorias */
export async function getSubcategorias(): Promise<Subcategoria[]> {
  const response = await api.get("subcategorias/");
  return response.data;
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
