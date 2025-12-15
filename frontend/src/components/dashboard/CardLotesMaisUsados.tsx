import { useLotesMaisUsados } from "../../hooks/dashboard/useLotesMaisUsados";

export default function CardLotesMaisUsados() {
  const { lotes, loading, erro } = useLotesMaisUsados();

  if (loading) {
    return (
      <div className="bg-white w-[705px] p-4 rounded-md shadow-md">
        <p>Carregando lotes...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="bg-white w-[705px] p-4 rounded-md shadow-md">
        <p className="text-red-600">{erro}</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-[705px] p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-[#29854A]">
        Lotes mais usados
      </h2>

      <div className="space-y-2">
        {lotes.map((l) => (
          <div
            key={l.id}
            className="bg-gray-100 p-3 rounded-md border flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">{l.produto}</p>
              <p className="text-sm text-gray-600">
                Código do lote: <strong>{l.codigo}</strong>
              </p>
            </div>

            <span className="font-bold bg-[#29854A] text-white px-3 py-1 rounded-md">
              {l.usado} usos
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
