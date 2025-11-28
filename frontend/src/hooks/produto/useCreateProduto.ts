import { useState } from "react";
import {
  createProdutoUnitario,
  createProdutoFracionado,
} from "../../api/produtoApi";

export function useCreateProduto() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function criar(
    form: FormData,
    tipo: "unitario" | "fracionado"
  ): Promise<any> {
    setLoading(true);
    setErro("");

    try {
      if (tipo === "unitario") {
        return await createProdutoUnitario(form);
      }
      return await createProdutoFracionado(form);

    } catch (e: any) {
      const msg =
        e?.response?.data?.detail ||
        e?.response?.data?.error ||
        "Erro ao criar produto";

      setErro(msg);
      throw e; // permite o componente exibir toast, fechar modal etc.
    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}
