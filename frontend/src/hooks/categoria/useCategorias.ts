import { useEffect, useState } from "react";
import { getCategorias, type Categoria } from "../../api/categoriaApi";

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;
    getCategorias()
      .then((data) => { if (ativo) setCategorias(data); })
      .catch(() => { if (ativo) setErro("Erro ao carregar categorias"); })
      .finally(() => { if (ativo) setLoading(false); });
    return () => { ativo = false; }
  }, []);

  return { categorias, setCategorias, loading, erro };
}
