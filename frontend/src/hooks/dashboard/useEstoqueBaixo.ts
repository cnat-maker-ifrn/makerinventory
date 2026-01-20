import { useEffect, useState } from "react";
import type { ProdutoUnificado } from "../../types/produtounificado";
import { getProdutosBaixoEstoque } from "../../api/estoquebaixoApi";

export function useEstoqueBaixo() {
  const [produtos, setProdutos] = useState<ProdutoUnificado[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const data = await getProdutosBaixoEstoque();
      setProdutos(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { produtos, loading, reload: load };
}
