import { MdEdit } from "react-icons/md";

export default function TableLotes() {
  return (
    <div className="overflow-x-auto mt-4 shadow-md rounded-lg">
      <table className="min-w-full rounded-lg overflow-hidden">
        <thead className="bg-[#29854A] text-white">
          <tr>
            <th className="px-4 py-2 text-left">Foto</th>
            <th className="px-4 py-2 text-left">Nome</th>
            <th className="px-4 py-2 text-left">Código</th>
            <th className="px-4 py-2 text-left">Produto</th>
            <th className="px-4 py-2 text-left">Fornecedor</th>
            <th className="px-4 py-2 text-left">Quantidade</th>
            <th className="px-4 py-2 text-left">Preço</th>
            <th className="px-4 py-2 text-left">Validade</th>
            <th className="px-4 py-2 text-left">Entrada</th>
            <th className="px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          <tr className="hover:bg-gray-50">

            {/* Foto */}
            <td className=" px-4 py-2">
              <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center">
                Foto
              </div>
            </td>

            {/* Nome */}
            <td className=" px-4 py-2">Álcool Isopropílico</td>

            {/* Código */}
            <td className=" px-4 py-2">LOT-AB12CD34EF</td>

            {/* Produto Fracionado */}
            <td className=" px-4 py-2">Álcool (Produto Fracionado)</td>

            {/* Fornecedor */}
            <td className=" px-4 py-2">Fornecedor XYZ</td>

            {/* Quantidade + unidade */}
            <td className=" px-4 py-2">500 ml</td>

            {/* Preço */}
            <td className=" px-4 py-2">R$ 35,00</td>

            {/* Data de validade */}
            <td className=" px-4 py-2">20/12/2025</td>

            {/* Data de entrada */}
            <td className=" px-4 py-2">05/11/2024</td>

            {/* Botão de editar */}
            <td className=" px-4 py-2">
              <button className="text-blue-600 hover:bg rounded-md cursor-pointer p-1">
                <MdEdit size={24} />
              </button>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  );
}
