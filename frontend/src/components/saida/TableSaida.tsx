import { useMemo } from "react";

interface Props {
  search: string;
  dados: any[];
  loading: boolean;
  erro: string;
  page: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export default function TableSaida({ 
  search, 
  dados, 
  loading, 
  erro, 
  page, 
  hasNext, 
  hasPrevious, 
  onNextPage, 
  onPreviousPage 
}: Props) {
  function formatarData(iso: string) {
    return new Date(iso).toLocaleString("pt-BR");
  }

  const filtrados = useMemo(() => {
    const texto = search.toLowerCase();

    return dados.filter((s) => {
      const nomeItem = s.item_nome?.toLowerCase() || "";
      const nomeLote = s.lote_nome?.toLowerCase() || "";
      const resp = s.responsavel?.toLowerCase() || "";
      const codigo =
        s.item_codigo?.toLowerCase() ||
        s.lote_codigo?.toLowerCase() ||
        "";

      return (
        nomeItem.includes(texto) ||
        nomeLote.includes(texto) ||
        resp.includes(texto) ||
        codigo.includes(texto)
      );
    });
  }, [dados, search]);

  if (loading) return <p className="text-gray-500">Carregando saídas...</p>;
  if (erro) return <p className="text-red-600">{erro}</p>;

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg">
        {filtrados.length === 0 ? (
          <p className="text-gray-500 p-4">Nenhuma saída encontrada.</p>
        ) : (
          <table className="min-w-full rounded-lg overflow-hidden">
            <thead className="bg-[#1A955E] text-white">
              <tr>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Nome</th>
                <th className="px-4 py-2 text-left">Código</th>
                <th className="px-4 py-2 text-left">Quantidade</th>
                <th className="px-4 py-2 text-left">Responsável</th>
                <th className="px-4 py-2 text-left">Data/Hora</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {filtrados.map((s) => {
                const isItem = !!s.item;
                const nome = isItem ? s.item_nome : s.lote_nome;
                const codigo = isItem ? s.item_codigo : s.lote_codigo;

                return (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {isItem ? "Item" : "Lote (Fracionado)"}
                    </td>
                    <td className="px-4 py-2">{nome}</td>
                    <td className="px-4 py-2">{codigo}</td>
                    <td className="px-4 py-2">{s.quantidade}{isItem ? "un" : s.lote_unidade_de_medida?.toLowerCase() ?? ""}</td>
                    <td className="px-4 py-2">{s.responsavel}</td>
                    <td className="px-4 py-2">
                      {formatarData(s.data_saida)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* 🔽 PAGINAÇÃO */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={onPreviousPage}
          disabled={!hasPrevious}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="flex items-center">
          Página {page}
        </span>

        <button
          onClick={onNextPage}
          disabled={!hasNext}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </>
  );
}
