import { useEffect, useState } from "react";
import { getLotes } from "../../api/loteApi";
import type { Lote } from "../../types/lote";

export function useLotes() {
  const [dados, setDados] = useState<Lote[]>([]);
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
        const response = await getLotes(page);

        // Lidar com resposta que pode ser array ou PaginatedResponse
        const results = Array.isArray(response) 
          ? response 
          : response.results || [];

        const normalizados: Lote[] = results.map((l: any) => ({
          id: l.id,
          codigo: l.codigo,

          quantidade: Number(l.quantidade ?? 0),
          preco: Number(l.preco ?? 0),
          fornecedor: l.fornecedor ?? null,

          data_validade: l.data_validade ?? null,
          data_entrada: l.data_entrada ?? null,

          foto: l.foto ?? null,

          produto: {
            id: l.produto.id,
            nome: l.produto.nome,
          },
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
        console.error(e);
        setErro("Erro ao carregar lotes.");
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
