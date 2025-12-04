import { useState } from "react";
import { createSaida } from "../../api/saidaApi"; // função da API
import type { Saida } from "../../types/saida";   // tipo da Saida

export const useCreateSaida = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateSaida = async (
    data: Parameters<typeof createSaida>[0] // pega o mesmo tipo da função createSaida
  ): Promise<Saida | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await createSaida(data);
      return response;
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Erro ao criar saída";

      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createSaida: handleCreateSaida,
    loading,
    error,
  };
};
