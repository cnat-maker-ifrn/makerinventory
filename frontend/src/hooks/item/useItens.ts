import { useEffect, useState } from "react";
import { getItens } from "../../api/itemApi";
import type { Item } from "../../types/item";

export function useItens() {
  const [dados, setDados] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);

        const itens = await getItens();

        const normalizados: Item[] = itens.map((i: any) => ({
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
