import { useState } from "react";
import { createLote } from "../../api/loteApi";

export interface CreateLotePayload {
  produto: number;
  quantidade: string;
  preco: string;
  fornecedor?: string | null;
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
      const form = new FormData();
      
      form.append("produto_id", String(data.produto));
      form.append("quantidade", data.quantidade);
      form.append("preco", data.preco);

      if (data.fornecedor) {
        form.append("fornecedor", data.fornecedor);
      }

      if (data.data_validade) {
        form.append("data_validade", data.data_validade);
      }

      if (data.foto) {
        form.append("foto", data.foto);
      }

      await createLote(form);
      return true;

    } catch (e: any) {
      setErro(e.message || "Erro ao criar lote.");
      return false;

    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}