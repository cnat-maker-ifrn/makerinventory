import { useState } from "react";
import { createProdutoUnitario, createProdutoFracionado } from "../../api/produtoApi";
import { type ProdutoFracionado } from "../../types/produtofracionado";
import { type ProdutoUnitario } from "../../types/produtounitario";

export function useCreateProduto() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function criar(
    form: FormData,
    tipo: "unitario" | "fracionado"
  ): Promise<ProdutoUnitario | ProdutoFracionado> {
    setLoading(true);
    setErro("");

    try {
      if (tipo === "unitario") {
        return await createProdutoUnitario(form);
      }
      return await createProdutoFracionado(form);

    } catch (e: any) {
      const data = e?.response?.data;
      let msg = "Erro ao criar produto";

      if (data) {
        if (typeof data === "string") {
          msg = data;
        } else if (data.detail) {
          msg = data.detail;
        } else {
          const key = Object.keys(data)[0];
          msg = Array.isArray(data[key]) ? data[key][0] : data[key];
        }
      }

      setErro(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}

