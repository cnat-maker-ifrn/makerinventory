import { useState } from "react";
import { createSubcategoria, type Subcategoria } from "../../api/subcategoriaApi";

export function useCreateSubcategoria() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function criar(data: { nome: FormDataEntryValue; categoria: FormDataEntryValue }): Promise<Subcategoria | null> {
    setLoading(true);
    setErro("");

    try {
      const nova = await createSubcategoria(data);
      return nova;
    } catch (e: any) {
      setErro(e instanceof Error ? e.message : "Erro inesperado");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}
