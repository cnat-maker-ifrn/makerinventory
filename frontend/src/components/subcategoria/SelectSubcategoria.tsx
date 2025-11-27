import { useState } from "react";
import { useSubcategorias } from "../../hooks/subcategoria/useSubcategorias";
import { useCreateSubcategoria } from "../../hooks/subcategoria/useCreateSubcategoria";

interface SelectSubcategoriaProps {
  value?: string;
  onChange?: (id: string) => void;
}

export default function SelectSubcategoria({ value = "", onChange }: SelectSubcategoriaProps) {
  const { dados: subcategorias, loading, erro } = useSubcategorias();
  const { criar, loading: criando, erro: erroCriar } = useCreateSubcategoria();

  const [showModal, setShowModal] = useState(false);
  const [novaSubcategoriaNome, setNovaSubcategoriaNome] = useState("");
  const [novaSubcategoriaCategoriaId, setNovaSubcategoriaCategoriaId] = useState("");

  async function handleCriarNova() {
    if (!novaSubcategoriaNome || !novaSubcategoriaCategoriaId) return;

    const nova = await criar({ 
      nome: novaSubcategoriaNome, 
      categoria: novaSubcategoriaCategoriaId 
    });

    if (nova) {
      setShowModal(false);
      setNovaSubcategoriaNome("");
      setNovaSubcategoriaCategoriaId("");
      if (onChange) onChange(String(nova.id));
    }
  }

  return (
    <div className="p-4">
      <label className="block font-medium mb-2">Subcategoria:</label>

      {loading ? (
        <p>Carregando subcategorias...</p>
      ) : erro ? (
        <p className="text-red-600">{erro}</p>
      ) : (
        <select
          value={value}
          onChange={(e) => {
            if (e.target.value === "nova") setShowModal(true);
            else if (onChange) onChange(e.target.value);
          }}
          className="border rounded p-2 w-64"
        >
          <option value="">Selecione...</option>
          {subcategorias.map((s) => (
            <option key={s.id} value={s.id}>{s.nome}</option>
          ))}
          <option value="nova">+ Nova subcategoria...</option>
        </select>
      )}

      {/* Modal para criar nova subcategoria */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Cadastrar nova subcategoria</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome da subcategoria"
                value={novaSubcategoriaNome}
                onChange={(e) => setNovaSubcategoriaNome(e.target.value)}
                className="w-full border rounded-md p-2"
              />

              <input
                type="text"
                placeholder="ID da categoria"
                value={novaSubcategoriaCategoriaId}
                onChange={(e) => setNovaSubcategoriaCategoriaId(e.target.value)}
                className="w-full border rounded-md p-2"
              />

              {erroCriar && <p className="text-red-600 text-sm">{erroCriar}</p>}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md"
                  disabled={criando}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleCriarNova}
                  className="px-4 py-2 bg-[#29854A] text-white rounded-md hover:bg-[#246f3f]"
                  disabled={criando}
                >
                  {criando ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
