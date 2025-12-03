import { useState } from "react";
import { createCategoria } from "../../api/categoriaApi";
import { type Categoria } from "../../types/categoria";

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
