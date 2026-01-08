import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useEntradasSaidas } from "../../hooks/dashboard/useEntradasSaidas";

export default function CardGraficoEntradaSaida() {
  const { dados, loading, erro } = useEntradasSaidas();

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-md shadow-sm w-full h-[350px] flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="bg-white p-4 rounded-md shadow-sm w-full h-[350px] flex items-center justify-center">
        <p className="text-red-600">{erro}</p>
      </div>
    );
  }

  const dadosSanitizados = Array.isArray(dados) ? dados : [];

  return (
    <div className="bg-white p-4 rounded-md shadow-sm w-full min-h-[45vh]">
      <h2 className="text-xl font-semibold mb-4 text-[#29854A]">
        Entradas x Saídas (Últimos 12 meses)
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={dadosSanitizados}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="entradas" fill="#29854A" />
          <Bar dataKey="saidas" fill="#DF0A0A" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}