import { useEffect, useState } from "react";
import { getLotesMaisUsados } from "../../api/dashboardApi";

export interface LoteMaisUsado {
  id: number;
  codigo: string;
  produto: string;
  usado: number;
}

export function useLotesMaisUsados() {
  const [lotes, setLotes] = useState<LoteMaisUsado[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    getLotesMaisUsados()
      .then((data) => setLotes(data))
      .catch(() => setErro("Erro ao carregar lotes mais usados"))
      .finally(() => setLoading(false));
  }, []);

  return { lotes, loading, erro };
}
