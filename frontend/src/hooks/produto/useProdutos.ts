import { useEffect, useState } from "react";
import { getProdutosUnitarios, getProdutosFracionados } from "../../api/produtoApi";
import { type ProdutoUnificado } from "../../types/produtounificado";

export function useProdutos() {
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

                const [unitResponse, fracResponse] = await Promise.all([
                    getProdutosUnitarios(page),
                    getProdutosFracionados(page)
                ]);

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
                
                // Configurar paginação apenas se for PaginatedResponse
                if (!Array.isArray(unitResponse) && !Array.isArray(fracResponse)) {
                    setTotalCount(unitResponse.count + fracResponse.count);
                    setHasNext(!!unitResponse.next || !!fracResponse.next);
                    setHasPrevious(!!unitResponse.previous || !!fracResponse.previous);
                } else {
                    setTotalCount(unitResults.length + fracResults.length);
                    setHasNext(false);
                    setHasPrevious(false);
                }
            } catch (e) {
                console.error("Erro ao carregar produtos:", e);
                setErro("Erro ao carregar produtos.");
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