import { useState } from "react";
import { createLote } from "../../api/loteApi";

export interface CreateLotePayload {
  produto: number;            // id do produto fracionado
  quantidade: string;
  preco: string;
  fornecedor: string;
  data_validade?: string | null;
  foto?: File | null;
}

export function useCreateLote() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function criar(data: CreateLotePayload): Promise<boolean> {
    setLoading(true);
    setErro("");

    try {
      const formData = new FormData();

      formData.append("produto_id", String(data.produto));   // <- CORRETO!
      formData.append("quantidade", data.quantidade);
      formData.append("preco", data.preco);
      formData.append("fornecedor", data.fornecedor);

      if (data.data_validade) {
        formData.append("data_validade", data.data_validade);
      }

      if (data.foto) {
        formData.append("foto", data.foto);
      }

      await createLote(formData);
      return true;
    } catch (e: any) {
      setErro(e.message || "Erro inesperado");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}
