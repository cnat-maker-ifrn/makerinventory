import { useEffect, useState } from "react";
import { getLotes } from "../../api/loteApi";
import type { Lote } from "../../types/lote";

export function useLotes() {
  const [dados, setDados] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const lotes = await getLotes();

        const normalizados: Lote[] = lotes.map((l: any) => ({
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
      } catch (e) {
        console.error(e);
        setErro("Erro ao carregar lotes.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  return { dados, loading, erro };
}
