export default function TableProduto() {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Código</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Subcategoria</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Quantidade</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Qtd. mínima</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>

        <tbody>
          {/* Exemplo de linha (para depois substituir por map) */}
          <tr className="hover:bg-gray-50">
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">Arduino Uno</td>
            <td className="border px-4 py-2">Unitário</td>
            <td className="border px-4 py-2">Eletrônica</td>
            <td className="border px-4 py-2 text-left">15</td>
            <td className="border px-4 py-2 text-left">5</td>
            <td className="border px-4 py-2 text-left">
              <button className="text-blue-600 hover:underline mr-2">Editar</button>
              <button className="text-red-600 hover:underline">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
