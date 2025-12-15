import { MdEdit } from "react-icons/md";
import { useProdutos } from "../../hooks/produto/useProdutos";

interface Props {
  search: string;
}

export default function TableProduto({ search }: Props) {
  const { dados: produtos, loading, erro } = useProdutos();

  if (loading) return <p>Carregando produtos...</p>;
  if (erro) return <p className="text-red-600">{erro}</p>;

  const termo = search.toLowerCase();

  const produtosFiltrados = produtos.filter((p) =>
    [
      p.nome,
      p.tipo,
      p.subcategoria,
    ]
      .filter(Boolean)
      .some((campo) => campo.toLowerCase().includes(termo))
  );

  return (
    <div className="overflow-x-auto mt-4 shadow-md rounded-lg">
      <table className="min-w-full rounded-lg overflow-hidden">
        <thead className="bg-[#1A955E] text-white">
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
          {produtosFiltrados.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                {p.foto ? (
                  <img
                    src={p.foto}
                    className="w-14 h-14 object-cover rounded-md"
                    alt={p.nome}
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-600">
                    Foto
                  </div>
                )}
              </td>

              <td className="px-4 py-2">{p.nome}</td>

              <td className="px-4 py-2 capitalize">
                {p.tipo === "unitario" ? "Unitário" : "Fracionado"}
              </td>

              <td className="px-4 py-2">{p.subcategoria}</td>

              <td className="px-4 py-2">{p.quantidade}</td>

              <td className="px-4 py-2">{p.quantidade_minima}</td>

              <td className="px-4 py-2">
                <button className="text-blue-600 hover:bg-gray-300 p-1 rounded-md cursor-pointer">
                  <MdEdit size={26} />
                </button>
              </td>
            </tr>
          ))}

          {produtosFiltrados.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500">
                Nenhum produto encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
