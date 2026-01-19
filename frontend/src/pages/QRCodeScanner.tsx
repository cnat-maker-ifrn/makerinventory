import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarItemPorCodigo, buscarLotePorCodigo } from "../api/qrcodeApi";
import { MdClose } from "react-icons/md";

export default function QRCodeScanner() {
  const { codigo } = useParams<{ codigo: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!codigo) {
      setError("Código não fornecido");
      setLoading(false);
      return;
    }

    const buscarDados = async () => {
      setLoading(true);
      setError("");

      let resultado = await buscarItemPorCodigo(codigo);
      
      if (!resultado) {

        resultado = await buscarLotePorCodigo(codigo);
      }

      if (resultado) {
        console.log("Resultado encontrado:", resultado);
        setItem(resultado);
      } else {
        const erro = `Nenhum item ou lote encontrado com o código: ${codigo}`;
        setError(erro);
      }

      setLoading(false);
    };

    buscarDados();
  }, [codigo]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {item?.produto ? "Informações do Lote" : "Informações do Item"}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="p-1 hover:bg-gray-200 rounded-full"
          >
            <MdClose size={24} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="text-gray-500">Carregando informações...</div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="text-red-700">{error}</div>
          </div>
        ) : item ? (
          <div className="space-y-4">
            {/* Foto */}
            {item.foto && (
              <div className="flex justify-center">
                <img
                  src={item.foto}
                  alt={item.nome}
                  className="w-40 h-40 object-cover rounded-md shadow-md"
                  onError={(e) => {
                    console.error("Erro ao carregar imagem:", e);
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Informações */}
            <div className="bg-gray-50 p-4 rounded-md space-y-3">
              <div>
                <div className="text-sm text-gray-600">Nome:</div>
                <div className="font-semibold text-lg">{item.nome}</div>
              </div>

              <div>
                <div className="text-sm text-gray-600">Código:</div>
                <div className="font-mono font-semibold">{item.codigo}</div>
              </div>

              {/* Para lotes - exibir nome do produto */}
              {item.produto?.nome && (
                <div>
                  <div className="text-sm text-gray-600">Produto:</div>
                  <div className="font-semibold">{item.produto.nome}</div>
                </div>
              )}

              {item.preco && (
                <div>
                  <div className="text-sm text-gray-600">Preço:</div>
                  <div className="font-semibold">R$ {item.preco}</div>
                </div>
              )}

              {item.quantidade && (
                <div>
                  <div className="text-sm text-gray-600">Quantidade:</div>
                  <div className="font-semibold">{item.quantidade}</div>
                </div>
              )}

              {item.disponibilidade !== undefined && (
                <div>
                  <div className="text-sm text-gray-600">Disponibilidade:</div>
                  <div className={`font-semibold ${item.disponibilidade ? "text-green-600" : "text-red-600"}`}>
                    {item.disponibilidade ? "Disponível" : "Indisponível"}
                  </div>
                </div>
              )}

              {item.eh_emprestado !== undefined && (
                <div>
                  <div className="text-sm text-gray-600">Emprestado:</div>
                  <div className={`font-semibold ${item.eh_emprestado ? "text-red-600" : "text-green-600"}`}>
                    {item.eh_emprestado ? "Sim" : "Não"}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Botões */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Voltar
          </button>
        </div>

      </div>
    </div>
  );
}
