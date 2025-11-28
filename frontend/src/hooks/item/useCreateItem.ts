import { useState } from "react";
import { createItem } from "../../api/itemApi";

export interface CreateItemPayload {
  nome: string;
  produto: number;
  preco: string;
  proprietario_cnat: string; 
  imagem?: File | null;
}

export function useCreateItem() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function criar(data: CreateItemPayload): Promise<boolean> {
    setLoading(true);
    setErro("");

    try {
      const formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("produto", String(data.produto));
      formData.append("preco", data.preco);
      formData.append("proprietario_cnat", data.proprietario_cnat);

      if (data.imagem) {
        formData.append("foto", data.imagem);
      }

      await createItem(formData); // <- agora usa a API centralizada

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
