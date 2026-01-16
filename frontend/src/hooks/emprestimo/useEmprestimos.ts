import { useEffect, useState } from "react";
import { getEmprestimos } from "../../api/emprestimoApi";
import { type Emprestimo } from "../../types/emprestimo";

export function useEmprestimos(
  search = "",
  data_inicio = "",
  data_fim = ""
) {
  const [dados, setDados] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const response = await getEmprestimos(page, search, data_inicio, data_fim);

        // Normalização mínima caso a API venha com campos inesperados
        const results = Array.isArray(response)
          ? response
          : response.results || [];

        const normalizados: Emprestimo[] = results.map((e: any) => ({
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

        if (!Array.isArray(response)) {
          setTotalCount(response.count);
          setHasNext(!!response.next);
          setHasPrevious(!!response.previous);
        } else {
          setTotalCount(results.length);
          setHasNext(false);
          setHasPrevious(false);
        }
      } catch (e: any) {
        console.error(e);
        setErro("Erro ao carregar empréstimos.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [page, search, data_inicio, data_fim]);

  const goToNextPage = () => {
    if (hasNext) setPage(p => p + 1);
  };

  const goToPreviousPage = () => {
    if (hasPrevious) setPage(p => Math.max(1, p - 1));
  };

  const goToPage = (pageNumber: number) => {
    setPage(Math.max(1, pageNumber));
  };

  return {
    dados,
    loading,
    erro,
    page,
    totalCount,
    hasNext,
    hasPrevious,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
}
