import { useEffect, useState } from "react";
import { getProdutosUnitarios, getProdutosFracionados } from "../../api/produtoApi";

export interface ProdutoUnificado {
    id: number;
    nome: string;
    tipo: "unitario" | "fracionado";
    subcategoria: string;
    foto: string | null;
    quantidade: number;
    quantidade_minima: number;
}

export function useProdutos() {
    const [dados, setDados] = useState<ProdutoUnificado[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregar() {
            try {
                setLoading(true);

                const [unit, frac] = await Promise.all([
                    getProdutosUnitarios(),
                    getProdutosFracionados()
                ]);

                const unitarios = unit.map((p: any) => ({
                    id: p.id,
                    nome: p.nome,
                    tipo: "unitario",
                    subcategoria: p.subcategoria_nome ?? p.subcategoria?.nome ?? "",
                    foto: p.foto ?? null,
                    quantidade: Number(p.quantidade_em_estoque ?? 0),
                    quantidade_minima: Number(p.quantidade_minima ?? 0),
                }));

                const fracionados = frac.map((p: any) => ({
                    id: p.id,
                    nome: p.nome,
                    tipo: "fracionado",
                    subcategoria: p.subcategoria_nome ?? p.subcategoria?.nome ?? "",
                    foto: p.foto ?? null,
                    quantidade: Number(p.quantidade_em_estoque ?? 0),
                    quantidade_minima: Number(p.quantidade_minima ?? 0),
                }));

                setDados([...unitarios, ...fracionados]);
            } catch (e) {
                setErro("Erro ao carregar produtos.");
            } finally {
                setLoading(false);
            }
        }

        carregar();
    }, []);

    return { dados, loading, erro };
}
