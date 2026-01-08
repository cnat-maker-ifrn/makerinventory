import { MdError } from "react-icons/md";
import { useEstoqueBaixo } from "../../hooks/dashboard/useEstoqueBaixo";

export default function CardEstoqueBaixo() {
  const { produtos, loading } = useEstoqueBaixo();

  const hasScroll = produtos.length > 3;

  if (loading) {
    return (
      <div className="bg-[#FFE3E3] w-[100%] p-4 rounded-md shadow-md">
        <p className="text-red-600">Carregando estoque...</p>
      </div>
    );
  }

  return (
    <div className="relative bg-[#FFE3E3] w-[100%] min-h-[45vh] p-4 rounded-md shadow-md overflow-hidden">
      <h2 className="flex text-[#DF0A0A] items-center gap-2 mb-4 text-xl font-semibold">
        <MdError size={28} />
        Estoque baixo
      </h2>

      <div
        className={`space-y-2 pr-1 ${
          hasScroll
            ? "max-h-[200px] overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            : ""
        }`}
      >
        {produtos.map((p, index) => (
          <div
            key={`${p.id}-${index}`}
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
