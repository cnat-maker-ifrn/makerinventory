import { useState } from "react";
import { createSolicitante, type SolicitantePayload } from "../../api/solicitanteApi";

export function useCreateSolicitante() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function criar(data: SolicitantePayload): Promise<boolean> {
    setLoading(true);
    setErro("");

    try {
      await createSolicitante(data);
      return true;
    } catch (e: any) {
      console.error("Erro ao criar solicitante:", e.response?.data || e.message);
      setErro(e.response?.data ? JSON.stringify(e.response.data) : e.message || "Erro inesperado");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}
