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
      setLoading(true);
      setErro("");

      try {
        const lista: Solicitante[] = await getSolicitantes();
        setDados(lista);
      } catch (e: any) {
        console.error("Erro ao carregar solicitantes:", e);
        setErro("Erro ao carregar solicitantes.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  return { dados, loading, erro };
}
