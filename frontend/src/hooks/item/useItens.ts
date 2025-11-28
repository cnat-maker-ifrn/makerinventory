import { useEffect, useState } from "react";
import { getItens } from "../../api/itemApi";

export interface ProdutoDetalhes {
  id: number;
  nome: string;
  quantidade_minima: number;
  subcategoria: number;
  subcategoria_nome?: string;
  foto: string | null;
}

export interface ItemUnificado {
  id: number;
  nome: string;                  // nome do ITEM
  codigo: string;
  foto: string | null;
  preco: number;
  data_entrada: string;

  produto: number;               // id do produto
  produto_detalhes: ProdutoDetalhes | null; // detalhes do produto

  eh_do_cnatmaker: boolean;
  disponibilidade: boolean;
  eh_quebrado: boolean;
  eh_emprestado: boolean;
}

export function useItens() {
  const [dados, setDados] = useState<ItemUnificado[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);

        const itens = await getItens();

        const normalizados: ItemUnificado[] = itens.map((i: any) => ({
          id: i.id,
          nome: i.nome,                        // Mantém nome do item
          codigo: i.codigo,
          foto: i.foto ?? null,
          preco: Number(i.preco ?? 0),
          data_entrada: i.data_entrada,

          produto: i.produto,                  // ID do produto
          produto_detalhes: i.produto_detalhes ?? null, // objeto completo do produto

          eh_do_cnatmaker: Boolean(i.eh_do_cnatmaker),
          disponibilidade: Boolean(i.disponibilidade),
          eh_quebrado: Boolean(i.eh_quebrado),
          eh_emprestado: Boolean(i.eh_emprestado),
        }));

        setDados(normalizados);
      } catch (e) {
        console.error(e);
        setErro("Erro ao carregar itens.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  return { dados, loading, erro };
}
