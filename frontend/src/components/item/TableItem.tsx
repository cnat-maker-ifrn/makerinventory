import { MdEdit } from "react-icons/md";

export default function TableItem() {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full rounded-lg overflow-hidden">
        <thead className="bg-[#29854A] text-white">
          <tr>
            <th className="px-4 py-2 text-left">Foto</th>
            <th className="px-4 py-2 text-left">Nome</th>
            <th className="px-4 py-2 text-left">Código</th>
            <th className="px-4 py-2 text-left">Produto</th>
            <th className="px-4 py-2 text-left">Proprietário</th>
            <th className="px-4 py-2 text-left">Disponível</th>
            <th className="px-4 py-2 text-left">Quebrado</th>
            <th className="px-4 py-2 text-left">Emprestado</th>
            <th className="px-4 py-2 text-left">Preço</th>
            <th className="px-4 py-2 text-left">Entrada</th>
            <th className="px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          <tr className="hover:bg-gray-50">
            {/* Foto */}
            <td className="px-4 py-2">
              <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center">
                Foto
              </div>
            </td>

            {/* Nome */}
            <td className="px-4 py-2">Arduino Uno</td>

            {/* Código */}
            <td className="px-4 py-2">ITM-123ABC8901</td>

            {/* Produto unitário pai */}
            <td className="px-4 py-2">Arduino</td>

            {/* Origem */}
            <td className="px-4 py-2">CNAT Maker</td>

            {/* Disponível */}
            <td className="px-4 py-2">Sim</td>

            {/* Quebrado */}
            <td className="px-4 py-2">Não</td>

            {/* Emprestado */}
            <td className="px-4 py-2">Não</td>

            {/* Preço */}
            <td className="px-4 py-2">R$ 120,00</td>

            {/* Data de entrada */}
            <td className="px-4 py-2">05/11/2024</td>

            {/* Ações */}
            <td className="px-4 py-2">
              <button className="text-blue-600 hover:bg-gray-300 rounded-md cursor-pointer p-1">
                <MdEdit size={24} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
