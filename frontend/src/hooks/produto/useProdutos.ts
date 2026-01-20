import { useEffect, useState } from "react";
import { getProdutosUnitarios, getProdutosFracionados } from "../../api/produtoApi";
import type { ProdutoUnificado } from "../../types/produtounificado";
import type { ProdutoUnitario } from "../../types/produtounitario";
import type { ProdutoFracionado } from "../../types/produtofracionado";

interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

export function useProdutos(
  search = "",
  tipo: "todos" | "unitario" | "fracionado" = "todos"
) {
  const [dados, setDados] = useState<ProdutoUnificado[]>([]);
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

        let unitResponse: PaginatedResponse<ProdutoUnitario> = {
          results: [],
          count: 0,
          next: null,
          previous: null,
        };
        let fracResponse: PaginatedResponse<ProdutoFracionado> = {
          results: [],
          count: 0,
          next: null,
          previous: null,
        };

        // Buscar unitários
        if (tipo === "unitario" || tipo === "todos") {
          unitResponse = await getProdutosUnitarios(page, search);
        }

        // Buscar fracionados
        if (tipo === "fracionado" || tipo === "todos") {
          fracResponse = await getProdutosFracionados(page, search);
        }

        // Mapear para ProdutoUnificado com subcategoria normalizada
        const unitarios: ProdutoUnificado[] = unitResponse.results.map((p) => ({
          id: p.id,
          nome: p.nome,
          tipo: "unitario",
          subcategoria: (p.subcategoria_nome ?? "").trim(),
          foto: p.foto ?? null,
          quantidade: Number(p.quantidade_em_estoque ?? 0),
          quantidade_minima: Number(p.quantidade_minima ?? 0),
          unidade_de_medida: "un",
        }));

        const fracionados: ProdutoUnificado[] = fracResponse.results.map((p) => ({
          id: p.id,
          nome: p.nome,
          tipo: "fracionado",
          subcategoria: (p.subcategoria_nome ?? "").trim(),
          foto: p.foto ?? null,
          quantidade: Number(p.quantidade_em_estoque ?? 0),
          quantidade_minima: Number(p.quantidade_minima ?? 0),
          unidade_de_medida: p.unidade_de_medida ?? null,
        }));

        setDados([...unitarios, ...fracionados]);

        // Paginação
        if (tipo === "todos") {
          setTotalCount(unitResponse.count + fracResponse.count);
          setHasNext(!!unitResponse.next || !!fracResponse.next);
          setHasPrevious(!!unitResponse.previous || !!fracResponse.previous);
        } else if (tipo === "unitario") {
          setTotalCount(unitResponse.count);
          setHasNext(!!unitResponse.next);
          setHasPrevious(!!unitResponse.previous);
        } else {
          setTotalCount(fracResponse.count);
          setHasNext(!!fracResponse.next);
          setHasPrevious(!!fracResponse.previous);
        }
      } catch (e: any) {
        console.error("Erro ao carregar produtos:", e);
        setErro("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [page, search, tipo]);

  const goToNextPage = () => setPage((p) => (hasNext ? p + 1 : p));
  const goToPreviousPage = () => setPage((p) => (hasPrevious ? Math.max(1, p - 1) : p));
  const goToPage = (pageNumber: number) => setPage(Math.max(1, pageNumber));

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
