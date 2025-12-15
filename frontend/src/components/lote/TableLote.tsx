import { MdEdit } from "react-icons/md";
import { useLotes } from "../../hooks/lote/useLotes";

interface Props {
  search: string;
}

export default function TableLotes({ search }: Props) {
  const { dados: lotes, loading, erro } = useLotes();

  if (loading) return <div>Carregando lotes...</div>;
  if (erro) return <div className="text-red-600">{erro}</div>;

  const termo = search.toLowerCase();

  const lotesFiltrados = lotes.filter((lote) =>
    (
      lote.produto?.nome?.toLowerCase().includes(termo) ||
      lote.codigo?.toLowerCase().includes(termo) ||
      lote.fornecedor?.toLowerCase().includes(termo)
    )
  );

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full rounded-lg overflow-hidden">
        <thead className="bg-[#1A955E] text-white">
          <tr>
            <th className="px-4 py-2 text-left">Foto</th>
            <th className="px-4 py-2 text-left">Produto</th>
            <th className="px-4 py-2 text-left">Código</th>
            <th className="px-4 py-2 text-left">Fornecedor</th>
            <th className="px-4 py-2 text-left">Quantidade</th>
            <th className="px-4 py-2 text-left">Preço</th>
            <th className="px-4 py-2 text-left">Validade</th>
            <th className="px-4 py-2 text-left">Entrada</th>
            <th className="px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {lotesFiltrados.map((lote) => (
            <tr key={lote.id} className="hover:bg-gray-50">
              {/* Foto */}
              <td className="px-4 py-2">
                {lote.foto ? (
                  <img
                    src={lote.foto}
                    className="w-14 h-14 object-cover rounded-md"
                    alt={lote.produto?.nome ?? "Produto"}
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-600">
                    Foto
                  </div>
                )}
              </td>

              {/* Produto */}
              <td className="px-4 py-2">{lote.produto?.nome ?? "-"}</td>

              {/* Código */}
              <td className="px-4 py-2">{lote.codigo}</td>

              {/* Fornecedor */}
              <td className="px-4 py-2">{lote.fornecedor ?? "-"}</td>

              {/* Quantidade */}
              <td className="px-4 py-2">{lote.quantidade}</td>

              {/* Preço */}
              <td className="px-4 py-2">
                R$ {Number(lote.preco).toFixed(2).replace(".", ",")}
              </td>

              {/* Validade */}
              <td className="px-4 py-2">
                {lote.data_validade
                  ? new Date(lote.data_validade).toLocaleDateString()
                  : "-"}
              </td>

              {/* Entrada */}
              <td className="px-4 py-2">
                {new Date(lote.data_entrada).toLocaleDateString()}
              </td>

              {/* Ações */}
              <td className="px-4 py-2">
                <button className="text-blue-600 hover:bg-gray-300 rounded-md cursor-pointer p-1">
                  <MdEdit size={24} />
                </button>
              </td>
            </tr>
          ))}

          {lotesFiltrados.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center py-6 text-gray-500">
                Nenhum lote encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
