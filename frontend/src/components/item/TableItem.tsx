import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

interface Item {
  id: number;
  codigo: string;
  foto: string | null;
  produto: { nome: string };
  eh_do_cnatmaker: boolean;
  disponibilidade: boolean;
  eh_quebrado: boolean;
  eh_emprestado: boolean;
  preco: string | number;
  data_entrada: string;
}

export default function TableItem() {
  const [itens, setItens] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchItens() {
    try {
    const response = await fetch("http://127.0.0.1:8000/api/itens/");
    const data = await response.json();
    setItens(data);
    } catch (error) {
    console.error("Erro ao carregar itens:", error);
    } finally {
    setLoading(false);
    }
  }

    fetchItens();  
  }, []);

  if (loading) {
    return <div>Carregando itens...</div>;
  }

  return ( 
    <div className="overflow-x-auto shadow-md rounded-lg"> <table className="min-w-full rounded-lg overflow-hidden"> <thead className="bg-[#1A955E] text-white"> <tr> <th className="px-4 py-2 text-left">Foto</th> <th className="px-4 py-2 text-left">Nome</th> <th className="px-4 py-2 text-left">Código</th> <th className="px-4 py-2 text-left">Produto</th> <th className="px-4 py-2 text-left">Proprietário</th> <th className="px-4 py-2 text-left">Disponível</th> <th className="px-4 py-2 text-left">Quebrado</th> <th className="px-4 py-2 text-left">Emprestado</th> <th className="px-4 py-2 text-left">Preço</th> <th className="px-4 py-2 text-left">Entrada</th> <th className="px-4 py-2 text-left">Ações</th> </tr> </thead>
        <tbody className="bg-white">  
          {itens.map((item) => (  
            <tr key={item.id} className="hover:bg-gray-50">  
              <td className="px-4 py-2">
                {item.foto ? (
                  <img
                    src={item.foto}
                    className="w-14 h-14 object-cover rounded-md"
                    alt={item.produto.nome}
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-600">
                    Foto
                  </div>
                )}
              </td>
              <td className="px-4 py-2">{item.produto.nome}</td>
              <td className="px-4 py-2">{item.codigo}</td>  
              <td className="px-4 py-2">{item.produto.nome}</td>  
              <td className="px-4 py-2">{item.eh_do_cnatmaker ? "CNAT Maker" : "IFRN"}</td>  
              <td className="px-4 py-2">{item.disponibilidade ? "Sim" : "Não"}</td>  
              <td className="px-4 py-2">{item.eh_quebrado ? "Sim" : "Não"}</td>  
              <td className="px-4 py-2">{item.eh_emprestado ? "Sim" : "Não"}</td>  
              <td className="px-4 py-2">R$ {item.preco}</td>  
              <td className="px-4 py-2">{new Date(item.data_entrada).toLocaleDateString()}</td>  
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
