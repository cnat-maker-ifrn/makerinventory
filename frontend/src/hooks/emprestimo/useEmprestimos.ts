import { useEffect, useState } from "react";
import { getEmprestimos } from "../../api/emprestimoApi";
import { type Emprestimo } from "../../types/emprestimo";

export function useEmprestimos() {
  const [dados, setDados] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const emprestimos = await getEmprestimos();

        // Normalização mínima caso a API venha com campos inesperados
        const normalizados: Emprestimo[] = emprestimos.map((e: any) => ({
          id: e.id,
          solicitante: e.solicitante,
          solicitante_nome: e.solicitante_nome,
          itens: e.itens ?? [],
          data_emprestimo: e.data_emprestimo,
          previsao_entrega: e.previsao_entrega,
          data_entrega: e.data_entrega ?? null,
          responsavel: e.responsavel,
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
