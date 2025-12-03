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

  async function criar(data: CreateItemPayload) {
    setLoading(true);
    setErro("");

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key === "imagem" ? "foto" : key, value as any);
        }
      });

      const item = await createItem(formData);
      return item;
      
    } catch (e: any) {
      setErro(
        e.response?.data?.detail ||
        e.response?.data?.message ||
        "Erro ao criar item"
      );
      throw e;

    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}
