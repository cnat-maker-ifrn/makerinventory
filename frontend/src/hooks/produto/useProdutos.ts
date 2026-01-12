import { useEffect, useState } from "react";
import { getProdutosUnitarios, getProdutosFracionados } from "../../api/produtoApi";
import { type ProdutoUnificado } from "../../types/produtounificado";

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

                // Determinar qual endpoint chamar baseado no tipo
                const shouldLoadUnitarios = tipo === "unitario" || tipo === "todos";
                const shouldLoadFracionados = tipo === "fracionado" || tipo === "todos";

                let unitResponse = { results: [], count: 0, next: null, previous: null };
                let fracResponse = { results: [], count: 0, next: null, previous: null };

                if (shouldLoadUnitarios && tipo !== "fracionado") {
                    unitResponse = await getProdutosUnitarios(page, search);
                }

                if (shouldLoadFracionados && tipo !== "unitario") {
                    fracResponse = await getProdutosFracionados(page, search);
                }

                // Lidar com resposta que pode ser array ou PaginatedResponse
                const unitResults = Array.isArray(unitResponse) 
                    ? unitResponse 
                    : unitResponse.results || [];
                const fracResults = Array.isArray(fracResponse) 
                    ? fracResponse 
                    : fracResponse.results || [];

                const unitarios = unitResults.map((p: any) => ({
                    id: p.id,
                    nome: p.nome,
                    tipo: "unitario",
                    subcategoria: p.subcategoria_nome ?? p.subcategoria?.nome ?? "",
                    foto: p.foto ?? null,
                    quantidade: Number(p.quantidade_em_estoque ?? 0),
                    quantidade_minima: Number(p.quantidade_minima ?? 0),
                }));

                const fracionados = fracResults.map((p: any) => ({
                    id: p.id,
                    nome: p.nome,
                    tipo: "fracionado",
                    subcategoria: p.subcategoria_nome ?? p.subcategoria?.nome ?? "",
                    foto: p.foto ?? null,
                    quantidade: Number(p.quantidade_em_estoque ?? 0),
                    quantidade_minima: Number(p.quantidade_minima ?? 0),
                }));

                setDados([...unitarios, ...fracionados]);
                
                // Configurar paginação baseado no tipo selecionado
                if (tipo === "todos") {
                    // Se mostrar ambos, considerar o hasNext de ambas as respostas
                    const unitPag = !Array.isArray(unitResponse) ? unitResponse : null;
                    const fracPag = !Array.isArray(fracResponse) ? fracResponse : null;
                    
                    setTotalCount((unitPag?.count || 0) + (fracPag?.count || 0));
                    setHasNext(!!(unitPag?.next || fracPag?.next));
                    setHasPrevious(!!(unitPag?.previous || fracPag?.previous));
                } else if (tipo === "unitario") {
                    // Se mostrar apenas unitários
                    if (!Array.isArray(unitResponse)) {
                        setTotalCount(unitResponse.count);
                        setHasNext(!!unitResponse.next);
                        setHasPrevious(!!unitResponse.previous);
                    } else {
                        setTotalCount(unitResults.length);
                        setHasNext(false);
                        setHasPrevious(false);
                    }
                } else {
                    // Se mostrar apenas fracionados
                    if (!Array.isArray(fracResponse)) {
                        setTotalCount(fracResponse.count);
                        setHasNext(!!fracResponse.next);
                        setHasPrevious(!!fracResponse.previous);
                    } else {
                        setTotalCount(fracResults.length);
                        setHasNext(false);
                        setHasPrevious(false);
                    }
                }
            } catch (e: any) {
                console.error("Erro ao carregar produtos:", e);
                // Não limpar os dados já carregados, apenas mostrar erro
                if (page > 1) {
                    // Se o erro for ao tentar acessar próxima página, volta para página anterior
                    setPage(p => Math.max(1, p - 1));
                }
                setErro("Erro ao carregar produtos.");
            } finally {
                setLoading(false);
            }
        }

        carregar();
    }, [page, search, tipo]);

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