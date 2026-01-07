import { useEffect, useState } from "react";
import { getMovimentacoes } from "../../api/movimentacaoApi";
import type { Movimentacao } from "../../types/movimentacao";

export function useMovimentacoes() {
  const [dados, setDados] = useState<Movimentacao[]>([]);
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

        const response = await getMovimentacoes(page);

        // Lidar com resposta que pode ser array ou PaginatedResponse
        const results = Array.isArray(response) 
          ? response 
          : response.results || [];

        // Normalização (conversão de campos numéricos)
        const normalizados: Movimentacao[] = results.map(
          (m: Movimentacao) => ({
            ...m,
            quantidade: Number(m.quantidade),
          })
        );

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
        console.error("Erro ao carregar movimentações:", e);
        setErro("Erro ao carregar movimentações.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [page]);

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
    goToPage 
  };
}
