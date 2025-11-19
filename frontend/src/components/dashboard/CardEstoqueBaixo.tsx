import { useEffect, useState } from "react";
import { MdError } from "react-icons/md";

interface ProdutoBaixo {
  id: number;
  nome: string;
  quantidade: number;
  quantidade_minima: number;
}

export default function CardEstoqueBaixo() {
  const [produtosBaixos, setProdutosBaixos] = useState<ProdutoBaixo[]>([]);

  useEffect(() => {
    const mock = [
      { id: 1, nome: "PLA Preto", quantidade: 1.2, quantidade_minima: 2 },
      { id: 2, nome: "Resina UV", quantidade: 0.5, quantidade_minima: 1 },
      { id: 3, nome: "PETG Branco", quantidade: 2, quantidade_minima: 2 },
      { id: 4, nome: "Filamento ABS Azul", quantidade: 1, quantidade_minima: 3 },
      { id: 5, nome: "PLA Vermelho", quantidade: 0.8, quantidade_minima: 2 },
    ];
    setProdutosBaixos(mock);
  }, []);

  const hasScroll = produtosBaixos.length > 3;

  return (
    <div className="relative bg-[#FFE3E3] w-[100%] p-4 rounded-md shadow-md overflow-hidden">

      {/* Título */}
      <h2 className="flex text-[#DF0A0A] items-center gap-2 mb-4 text-xl font-semibold">
        <MdError size={28} />
        Alertas de estoque baixo
      </h2>

      {/* Lista com scroll invisível */}
      <div
        className={`space-y-2 pr-1 ${
          hasScroll
            ? "max-h-[200px] overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            : ""
        }`}
      >
        {produtosBaixos.map((p) => (
          <div
            key={p.id}
            className="bg-white p-3 rounded-md shadow-sm border border-[#ffb4b4] flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">{p.nome}</p>
              <p className="text-sm text-gray-600">
                Quantidade: <strong>{p.quantidade}</strong> / Mínima:{" "}
                <strong>{p.quantidade_minima}</strong>
              </p>
            </div>

            <span
              className={`text-sm font-bold px-3 py-1 rounded-md ${
                p.quantidade < p.quantidade_minima
                  ? "bg-[#DF0A0A] text-white"
                  : "bg-orange-400 text-white"
              }`}
            >
              {p.quantidade < p.quantidade_minima ? "Abaixo" : "No limite"}
            </span>
          </div>
        ))}
      </div>

      {hasScroll && (
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#FFE3E3] to-transparent" />
      )}
    </div>
  );
}
