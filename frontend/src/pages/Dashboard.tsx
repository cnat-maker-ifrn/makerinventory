import CardEstoqueBaixo from "../components/dashboard/CardEstoqueBaixo";
import CardGraficoEntradaSaida from "../components/dashboard/CardGraficoEntradaSaida";
import CardLotesMaisUsados from "../components/dashboard/CardLotesMaisUsados";

export default function Dashboard() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {/* Coluna esquerda */}
      <div className="flex flex-col gap-4 md:col-span-1 lg:col-span-2">
        <CardEstoqueBaixo />
        <CardGraficoEntradaSaida />
      </div>

      {/* Coluna direita */}
      <div className="md:col-span-1 lg:col-span-1 flex">
        <CardLotesMaisUsados />
      </div>

    </div>
  );
}
