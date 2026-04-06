import { MdError } from "react-icons/md";
import { useEstoqueBaixo } from "../../hooks/dashboard/useEstoqueBaixo";

function getUnidade(tipo: string | undefined, unidadeDeMedida: string | null | undefined): string {
  if (tipo === "unitario") {
    return "un";
  }
  if (tipo === "fracionado" && unidadeDeMedida) {
    return unidadeDeMedida;
  }
  return "";
}

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
    <div className="relative bg-[#FFE3E3] w-[100%] h-[40vh] p-4 rounded-md shadow-md overflow-hidden">
      <h2 className="flex text-[#DF0A0A] items-center gap-2 mb-4 text-xl font-semibold">
        <MdError size={28} />
        Estoque baixo
      </h2>

      <div
        className={`space-y-2 pr-1 ${
          hasScroll
            ? "max-h-[80%] overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            : ""
        }`}
      >
        {produtos.map((p, index) => {
          const unidade = getUnidade(p.tipo, p.unidade_de_medida);
          return (
            <div
              key={`${p.id}-${index}`}
              className="bg-white p-3 rounded-md shadow-sm border border-[#ffb4b4] flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg">{p.nome}</p>
                <p className="text-sm text-gray-600">
                  Quantidade: <strong>{p.quantidade}</strong>
                  {unidade && (
                    <span className="text-xs text-gray-500 ml-1">{unidade}</span>
                  )} / Mínima:{" "}
                  <strong>{p.quantidade_minima}</strong>
                  {unidade && (
                    <span className="text-xs text-gray-500 ml-1">{unidade}</span>
                  )}
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
          );
        })}
      </div>

      {hasScroll && (
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#FFE3E3] to-transparent" />
      )}
    </div>
  );
}