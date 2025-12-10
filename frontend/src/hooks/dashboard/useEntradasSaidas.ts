import { useEffect, useState } from "react";
import { getEntradasSaidas } from "../../api/dashboardApi";

export type MesDados = {
  mes: string;
  entradas: number;
  saidas: number;
};

export function useEntradasSaidas() {
  const [dados, setDados] = useState<MesDados[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
    getEntradasSaidas()
        .then((dadosApi) => {
        setDados(dadosApi); 
        })
        .catch(() => {
        setErro("Erro ao carregar dados do gráfico.");
        })
        .finally(() => {
        setLoading(false);
        });
    }, []);


  return { dados, loading, erro };
}
