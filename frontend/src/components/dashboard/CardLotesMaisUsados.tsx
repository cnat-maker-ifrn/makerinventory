import { useEffect, useState } from "react";

interface LoteMaisUsado {
  id: number;
  codigo: string;
  produto: string;
  usado: number; // quantidade de usos (para integração com backend)
}

export default function CardLotesMaisUsados() {
  const [lotes, setLotes] = useState<LoteMaisUsado[]>([]);

  useEffect(() => {
    // MOCK - Substituir pelo backend depois
    const mock = [
      { id: 1, codigo: "LT-001", produto: "PLA Preto", usado: 42 },
      { id: 2, codigo: "LT-019", produto: "Resina UV Cinza", usado: 37 },
      { id: 3, codigo: "LT-014", produto: "PETG Branco", usado: 28 },
      { id: 4, codigo: "LT-032", produto: "ABS Azul", usado: 22 },
      { id: 5, codigo: "LT-011", produto: "PLA Vermelho", usado: 19 },
    ];

    setLotes(mock);
  }, []);

  return (
    <div className="bg-white w-[705px] p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#29854A]">
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
