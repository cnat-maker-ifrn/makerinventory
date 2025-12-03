import { useState } from "react";
import { createSolicitante } from "../../api/solicitanteApi";
import type { Solicitante } from "../../types/solicitante";

export function useCreateSolicitante() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function criar(data: {
    nome: string;
    matricula: string;
    telefone?: string | null;
  }): Promise<Solicitante | null> {
    setLoading(true);
    setErro("");

    try {
      const novo = await createSolicitante(data);
      return novo;
    } catch (e: any) {
      console.error("Erro ao criar solicitante:", e.response?.data || e.message);
      setErro(
        e.response?.data ? JSON.stringify(e.response.data) : e.message || "Erro inesperado"
      );
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}
