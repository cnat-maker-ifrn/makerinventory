import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

interface ProdutoUnificado {
  id: number;
  nome: string;
  tipo: "unitario" | "fracionado";
  subcategoria: string;
  foto: string | null;
  quantidade: number | string;
  quantidade_minima: number | string;
}

export default function TableProduto() {
  const [produtos, setProdutos] = useState<ProdutoUnificado[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const [unitResp, fracResp] = await Promise.all([
          fetch("http://localhost:8000/api/produtos-unitarios/"),
          fetch("http://localhost:8000/api/produtos-fracionados/"),
        ]);

        if (!unitResp.ok || !fracResp.ok) {
          throw new Error("Erro ao buscar produtos do servidor.");
        }

        const unitarios = await unitResp.json();
        const fracionados = await fracResp.json();

        // Normaliza os dados em uma estrutura unificada
        const unificados: ProdutoUnificado[] = [
          ...unitarios.map((p: any) => ({
            id: p.id,
            nome: p.nome,
            tipo: "unitario",
            subcategoria: p.subcategoria_nome ?? p.subcategoria?.nome ?? "",
            foto: p.foto ?? null,
            quantidade: p.quantidade_em_estoque ?? 0,
            quantidade_minima: p.quantidade_minima,
          })),

          ...fracionados.map((p: any) => ({
            id: p.id,
            nome: p.nome,
            tipo: "fracionado",
            subcategoria: p.subcategoria_nome ?? p.subcategoria?.nome ?? "",
            foto: p.foto ?? null,
            quantidade: p.quantidade_em_estoque ?? "0",
            quantidade_minima: p.quantidade_minima,
          })),
        ];

        setProdutos(unificados);
      } catch (err) {
        console.error(err);
        setErro("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (erro) return <p className="text-red-600">{erro}</p>;

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
          {produtos.map((p) => (
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
        </tbody>
      </table>
    </div>
  );
}
