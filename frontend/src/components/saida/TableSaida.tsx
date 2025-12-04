import { useState, useMemo } from "react";
import { useSaidas } from "../../hooks/saida/useSaidas";

export default function TableSaida() {
  const { dados, loading, erro } = useSaidas();
  const [busca] = useState("");

  function formatarData(iso: string) {
    return new Date(iso).toLocaleString("pt-BR");
  }

  const filtrados = useMemo(() => {
    const texto = busca.toLowerCase();

    return dados.filter((s) => {
      const nomeItem = s.item?.nome?.toLowerCase() || "";
      const nomeLote = s.lote?.nome?.toLowerCase() || "";
      const resp = s.responsavel?.toLowerCase() || "";
      const codigo = s.item?.codigo?.toLowerCase() || s.lote?.codigo?.toLowerCase() || "";

      return (
        nomeItem.includes(texto) ||
        nomeLote.includes(texto) ||
        resp.includes(texto) ||
        codigo.includes(texto)
      );
    });
  }, [dados, busca]);

  return (
    <div className="w-full space-y-4">
      {loading && <p className="text-gray-500">Carregando saídas...</p>}
      {erro && <p className="text-red-600">{erro}</p>}

      {!loading && filtrados.length === 0 ? (
        <p className="text-gray-500">Nenhuma saída encontrada.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Tipo</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">Código</th>
                <th className="border p-2">Quantidade</th>
                <th className="border p-2">Responsável</th>
                <th className="border p-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((s) => {
                const isItem = !!s.item;
                const nome = isItem ? s.item!.nome : s.lote!.nome;
                const codigo = isItem ? s.item!.codigo : s.lote!.codigo;

                return (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="border p-2">
                      {isItem ? "Item" : "Lote (Fracionado)"}
                    </td>
                    <td className="border p-2">{nome}</td>
                    <td className="border p-2">{codigo}</td>
                    <td className="border p-2">{s.quantidade}</td>
                    <td className="border p-2">{s.responsavel}</td>
                    <td className="border p-2">{formatarData(s.data_saida)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
