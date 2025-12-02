import { type Movimentacao } from "../../types/movimentacao";

interface TableMovimentacaoProps {
  dados: Movimentacao[];
}

export const TableMovimentacao = ({ dados }: TableMovimentacaoProps) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow mt-6">
      <table className="min-w-full bg-white">
        <thead className="bg-[#1A955E] text-white">
          <tr>
            <th className="px-4 py-3 text-left">Tipo</th>
            <th className="px-4 py-3 text-left">Produto</th>
            <th className="px-4 py-3 text-left">Quantidade</th>
            <th className="px-4 py-3 text-left">Data</th>
          </tr>
        </thead>

        <tbody>
          {dados.map((m) => (
            <tr
              key={m.id}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 capitalize">{m.tipo_movimentacao}</td>
              <td className="px-4 py-3">{m.produto_nome}</td>
              <td className="px-4 py-3">{m.quantidade}</td>
              <td className="px-4 py-3">
                {new Date(m.data_movimentacao).toLocaleString("pt-BR")}
              </td>
            </tr>
          ))}

          {dados.length === 0 && (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-500 italic">
                Nenhuma movimentação encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
