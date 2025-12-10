import { useEffect, useState } from "react";
import type { ProdutoBaixo } from "../../types/produtobaixo";
import { getProdutosBaixoEstoque } from "../../api/estoquebaixoApi";

export function useEstoqueBaixo() {
  const [produtos, setProdutos] = useState<ProdutoBaixo[]>([]);
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
