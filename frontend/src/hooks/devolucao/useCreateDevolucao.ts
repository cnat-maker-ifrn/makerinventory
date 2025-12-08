import { useState } from "react";
import { createDevolucao } from "../../api/devolucaoApi";
import { type Devolucao } from "../../types/devolucao";

export function useCreateDevolucao() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function criar(data: {
    emprestimo: number;
    itens: number[];
    observacao?: string | null;
  }): Promise<Devolucao> {
    setLoading(true);
    setErro("");
    try {
      return await createDevolucao(data);
    } catch (e: any) {
      setErro(e.response?.data?.detail || "Erro ao criar devolução");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}
