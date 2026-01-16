import { useEffect, useState } from "react";
import { getItens } from "../../api/itemApi";
import type { Item } from "../../types/item";

export function useItens(
  search = "",
  data_inicio = "",
  data_fim = ""
) {
  const [dados, setDados] = useState<Item[]>([]);
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

        const response = await getItens(page, search, data_inicio, data_fim);

        // Lidar com resposta que pode ser array ou PaginatedResponse
        const results = Array.isArray(response) 
          ? response 
          : response.results || [];

        const normalizados: Item[] = results.map((i: any) => ({
          id: i.id,
          nome: i.nome,
          codigo: i.codigo,
          foto: i.foto ?? null,
          preco: Number(i.preco ?? 0),
          data_entrada: i.data_entrada,

          produto: Number(i.produto),                  // ID
          produto_detalhes: i.produto_detalhes ?? null, // OBJETO ProdutoUnitario

          eh_do_cnatmaker: Boolean(i.eh_do_cnatmaker),
          disponibilidade: Boolean(i.disponibilidade),
          eh_quebrado: Boolean(i.eh_quebrado),
          eh_emprestado: Boolean(i.eh_emprestado),
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
        setErro("Erro ao carregar itens.");
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
