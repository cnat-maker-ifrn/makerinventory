import { useEffect, useState } from "react";
import { getSolicitantes } from "../../api/solicitanteApi";

export interface Solicitante {
  id: number;
  nome: string;
  matricula: string;
  telefone?: string | null;
}

export function useSolicitantes() {
  const [dados, setDados] = useState<Solicitante[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const lista = await getSolicitantes();
        setDados(lista);
      } catch (e) {
        console.error(e);
        setErro("Erro ao carregar solicitantes.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  return { dados, loading, erro };
}
