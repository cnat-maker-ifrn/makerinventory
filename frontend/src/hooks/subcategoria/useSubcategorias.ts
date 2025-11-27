import { useEffect, useState } from "react";
import { getSubcategorias, type Subcategoria } from "../../api/subcategoriaApi";

export function useSubcategorias() {
  const [dados, setDados] = useState<Subcategoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    getSubcategorias()
      .then((data) => { if (ativo) setDados(data); })
      .catch((e) => { 
        console.error(e); 
        if (ativo) setErro("Erro ao carregar subcategorias"); 
      })
      .finally(() => { if (ativo) setLoading(false); });

    return () => { ativo = false; };
  }, []);

  return { dados, loading, erro };
}
