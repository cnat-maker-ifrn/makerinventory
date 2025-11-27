import { useEffect, useState } from "react";
import { getMovimentacoes } from "../../api/movimentacaoApi";
import type { Mov } from "../../components/movimentacao/ListMovimentacao";

export function useMovimentacoes(busca: string = "") {
    const [dados, setDados] = useState<Mov[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        let ativo = true;

        setLoading(true);
        setErro(null);

        getMovimentacoes(busca)
            .then(res => {
                if (ativo) setDados(res);
            })
            .catch(err => {
                if (ativo) setErro("Falha ao carregar movimentações");
                console.error(err);
            })
            .finally(() => {
                if (ativo) setLoading(false);
            });

        return () => {
            ativo = false;
        };
    }, [busca]);

    return { dados, loading, erro };
}
