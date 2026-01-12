import { useEffect, useState } from "react";
import { getSaidas } from "../../api/saidaApi";
import { type Saida } from "../../types/saida";

export function useSaidas(
  search = "",
  data_inicio = "",
  data_fim = ""
) {
  const [dados, setDados] = useState<Saida[]>([]);
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

        const response = await getSaidas(page, search, data_inicio, data_fim);

        // Lidar com resposta que pode ser array ou PaginatedResponse
        const results = Array.isArray(response) 
          ? response 
          : response.results || [];

        // Normalizar quantidade numérica (especialmente para fracionado)
        const normalizados: Saida[] = results.map((s: any) => ({
          ...s,
          quantidade: Number(s.quantidade),
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
      } catch (e) {
        console.error("Erro ao carregar saídas:", e);
        setErro("Erro ao carregar saídas.");
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
    goToPage 
  };
}
