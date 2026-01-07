import { useState } from "react";
import { updateProdutoUnitario, updateProdutoFracionado } from "../../api/produtoApi";

export function useUpdateProduto() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function atualizar(
    id: number,
    form: FormData,
    tipo: "unitario" | "fracionado"
  ) {
    setLoading(true);
    setErro("");

    try {
      if (tipo === "unitario") {
        return await updateProdutoUnitario(id, form);
      }
      return await updateProdutoFracionado(id, form);

    } catch (e: any) {
      const data = e?.response?.data;
      let msg = "Erro ao atualizar produto";

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

  return { atualizar, loading, erro };
}
