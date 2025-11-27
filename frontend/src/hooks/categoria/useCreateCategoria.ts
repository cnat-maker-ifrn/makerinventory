import { useState } from "react";
import { createCategoria, type Categoria } from "../../api/categoriaApi";

export function useCreateCategoria() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function criar(nome: string): Promise<Categoria> {
    setLoading(true);
    setErro("");
    try {
      return await createCategoria(nome);
    } catch(e:any) {
      setErro(e.response?.data?.detail || "Erro ao criar categoria");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}
