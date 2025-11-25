import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

interface Lote {
  id: number;
  codigo: string;
  quantidade: number;
  preco: number;
  fornecedor: string;
  data_validade: string;
  data_entrada: string;
  foto: string | null;
  produto: { nome: string };
}

export default function TableLotes() {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLotes() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/lotes/");
        const data = await res.json();
        setLotes(data);
      } catch (error) {
        console.error("Erro ao carregar lotes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLotes();
  }, []);

  if (loading) return <div>Carregando lotes...</div>;

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full rounded-lg overflow-hidden">
        <thead className="bg-[#1A955E] text-white">
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
          {lotes.map((lote) => (
            <tr key={lote.id} className="hover:bg-gray-50">

              {/* Foto */}
              <td className="px-4 py-2">
                {lote.foto ? (
                  <img
                    src={lote.foto}
                    className="w-14 h-14 object-cover rounded-md"
                    alt={lote.produto.nome}
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-600">
                    Foto
                  </div>
                )}
              </td>


              {/* Nome do produto */}
              <td className="px-4 py-2">{lote.produto.nome}</td>

              {/* Código */}
              <td className="px-4 py-2">{lote.codigo}</td>

              {/* Produto */}
              <td className="px-4 py-2">{lote.produto.nome}</td>

              {/* Fornecedor */}
              <td className="px-4 py-2">{lote.fornecedor}</td>

              {/* Quantidade */}
              <td className="px-4 py-2">{lote.quantidade}</td>

              {/* Preço */}
              <td className="px-4 py-2">
                R$ {Number(lote.preco).toFixed(2).replace(".", ",")}
              </td>

              {/* Data de validade */}
              <td className="px-4 py-2">
                {new Date(lote.data_validade).toLocaleDateString()}
              </td>

              {/* Data de entrada */}
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
        </tbody>
      </table>
    </div>
  );
}
