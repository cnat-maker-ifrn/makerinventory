import { useState } from "react";
import { createEmprestimo } from "../../api/emprestimoApi";

export interface CreateEmprestimoPayload {
  solicitante: number;       
  previsao_entrega: string;  
  itens: number[];          
  responsavel: string;     
  data_emprestimo: string;
}

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
      setErro(e.response?.data?.detail || "Erro ao criar empréstimo");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}
