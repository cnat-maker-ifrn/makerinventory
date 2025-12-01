import { useEffect, useState } from "react";
import { getEmprestimos } from "../../api/emprestimoApi";

export interface Emprestimo {
  id: number;
  solicitante: string;
  data_emprestimo: string;
  previsao_entrega: string;
  data_entrega?: string | null;
}

export function useEmprestimos() {
  const [dados, setDados] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const emprestimos = await getEmprestimos();

        // Normalização (caso a API venha com algum campo inesperado)
        const normalizados: Emprestimo[] = emprestimos.map((e: any) => ({
          id: e.id,
          solicitante: e.solicitante,
          data_emprestimo: e.data_emprestimo,
          previsao_entrega: e.previsao_entrega,
          data_entrega: e.data_entrega ?? null,
        }));

        setDados(normalizados);
      } catch (e: any) {
        console.error(e);
        setErro("Erro ao carregar empréstimos.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  return { dados, loading, erro };
}
