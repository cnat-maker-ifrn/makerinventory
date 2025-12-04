import { useEffect, useState } from "react";
import { getSaidas } from "../../api/saidaApi";
import { type Saida } from "../../types/saida";

export function useSaidas() {
  const [dados, setDados] = useState<Saida[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);

        const lista = await getSaidas();

        // Normalizar quantidade numérica (especialmente para fracionado)
        const normalizados: Saida[] = lista.map((s: any) => ({
          ...s,
          quantidade: Number(s.quantidade),
        }));

        setDados(normalizados);
      } catch (e) {
        console.error("Erro ao carregar saídas:", e);
        setErro("Erro ao carregar saídas.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  return { dados, loading, erro };
}
