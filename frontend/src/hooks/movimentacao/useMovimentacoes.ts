import { useEffect, useState } from "react";
import { getMovimentacoes } from "../../api/movimentacaoApi";
import type { Movimentacao } from "../../types/movimentacao";

export function useMovimentacoes() {
  const [dados, setDados] = useState<Movimentacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);

        const movs = await getMovimentacoes();

        // Normalização (conversão de campos numéricos)
        const normalizados: Movimentacao[] = movs.map((m: Movimentacao) => ({
          ...m,
          quantidade: Number(m.quantidade),
        }));

        setDados(normalizados);
      } catch (e: any) {
        console.error("Erro ao carregar movimentações:", e);
        setErro("Erro ao carregar movimentações.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  return { dados, loading, erro };
}
