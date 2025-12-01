import { useEffect, useState } from "react";
import { getLotes } from "../../api/loteApi";

export interface ProdutoFracionadoDetalhes {
  id: number;
  nome: string;
  unidade_de_medida: string;
  quantidade_minima: number;
  foto: string | null;
  subcategoria: number;
}

export interface LoteUnificado {
  id: number;
  codigo: string;

  quantidade: number;
  preco: number;
  fornecedor: string | null;

  data_validade: string;
  data_entrada: string;

  foto: string | null;

  produto: {
    id: number;
    nome: string;
  };
}

export function useLotes() {
  const [dados, setDados] = useState<LoteUnificado[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);

        const lotes = await getLotes();

        const normalizados: LoteUnificado[] = lotes.map((l: any) => ({
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
