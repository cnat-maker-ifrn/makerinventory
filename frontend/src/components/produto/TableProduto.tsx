import { MdEdit } from "react-icons/md"

export default function TableProduto() {
  return (
    <div className="overflow-x-auto mt-4 shadow-md rounded-lg">
      <table className="min-w-full rounded-lg overflow-hidden">
        <thead className="bg-[#29854A] text-white">
          <tr>
            <th className="px-4 py-2 text-left">Foto</th>
            <th className="px-4 py-2 text-left">Nome</th>
            <th className="px-4 py-2 text-left">Tipo</th>
            <th className="px-4 py-2 text-left">Subcategoria</th>
            <th className="px-4 py-2 text-left">Quantidade</th>
            <th className="px-4 py-2 text-left">Qtd. mínima</th>
            <th className="px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">Foto</td>
            <td className="px-4 py-2">Arduino Uno</td>
            <td className="px-4 py-2">Unitário</td>
            <td className="px-4 py-2">Eletrônica</td>
            <td className="px-4 py-2 text-left">15</td>
            <td className="px-4 py-2 text-left">5</td>
            <td className="px-4 py-2 text-left">
              <button className="text-blue-600 hover:bg-gray-300 rounded-md cursor-pointer"><MdEdit size={28} /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
