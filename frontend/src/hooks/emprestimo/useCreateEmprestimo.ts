import { useState } from "react";
import { createEmprestimo, type CreateEmprestimoPayload } from "../../api/emprestimoApi";

export function useCreateEmprestimo() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function criar(data: CreateEmprestimoPayload): Promise<boolean> {
    setLoading(true);
    setErro("");

    try {
      await createEmprestimo(data);
      return true;
    } catch (e: any) {
      setErro(e.response?.data?.detail || e.message || "Erro ao criar empréstimo.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}
