import { useState, useEffect } from "react";
import type { Impressora } from "../../types/calculadora3d";
import { MdClose, MdAdd, MdEdit, MdDelete } from "react-icons/md";

interface GerenciarImpressorasModalProps {
  isOpen: boolean;
  onClose: () => void;
  impressoras: Record<string, Impressora>;
  onSave: (impressoras: Record<string, Impressora>) => void;
}

export default function GerenciarImpressorasModal({
  isOpen,
  onClose,
  impressoras,
  onSave,
}: GerenciarImpressorasModalProps) {
  const [listaImpressoras, setListaImpressoras] = useState<Record<string, Impressora>>(impressoras);
  const [editando, setEditando] = useState<string | null>(null);
  const [adicionando, setAdicionando] = useState(false);
  const [formData, setFormData] = useState<Impressora>({
    id: "",
    nome: "",
    precoCompra: 0,
    consumoWatts: 0,
    vidaUtiHoras: 0,
    custoManutencaoMensal: 0,
  });

  // Sincronizar listaImpressoras com a prop quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setListaImpressoras(impressoras);
      resetForm();
    }
  }, [isOpen, impressoras]);

  const resetForm = () => {
    setFormData({
      id: "",
      nome: "",
      precoCompra: 0,
      consumoWatts: 0,
      vidaUtiHoras: 0,
      custoManutencaoMensal: 0,
    });
    setEditando(null);
    setAdicionando(false);
  };

  const handleEdit = (impressora: Impressora) => {
    setFormData(impressora);
    setEditando(impressora.id);
    setAdicionando(false);
  };

  const handleAdicionarNova = () => {
    setAdicionando(true);
    setEditando(null);
    resetForm();
  };

  const handleInputChange = (field: keyof Impressora, value: string | number) => {
    const numValue = ["precoCompra", "consumoWatts", "vidaUtiHoras", "custoManutencaoMensal"].includes(field)
      ? parseFloat(value as string) || 0
      : value;

    setFormData((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const handleSalvar = () => {
    if (!formData.nome || !formData.id) {
      alert("Nome e ID são obrigatórios");
      return;
    }

    const novasImpressoras = { ...listaImpressoras };

    if (editando) {
      // Se está editando e o ID mudou, remover o antigo
      if (editando !== formData.id) {
        delete novasImpressoras[editando];
      }
    }

    novasImpressoras[formData.id] = formData;
    setListaImpressoras(novasImpressoras);
    resetForm();
  };

  const handleDeletar = (id: string) => {
    if (confirm(`Tem certeza que deseja deletar esta impressora?`)) {
      const novasImpressoras = { ...listaImpressoras };
      delete novasImpressoras[id];
      setListaImpressoras(novasImpressoras);
    }
  };

  const handleSalvarTodas = () => {
    onSave(listaImpressoras);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Gerenciar Impressoras</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdClose size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Lista de Impressoras */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Impressoras ({Object.keys(listaImpressoras).length})
              </h3>
              <button
                onClick={handleAdicionarNova}
                disabled={adicionando || editando !== null}
                className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <MdAdd size={20} />
                Nova Impressora
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.values(listaImpressoras).map((imp) => (
                <div
                  key={imp.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    editando === imp.id ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex gap-4">
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{imp.nome}</h4>
                      <p className="text-sm text-gray-600">R$ {imp.precoCompra.toLocaleString("pt-BR")}</p>
                      <p className="text-sm text-gray-600">{imp.consumoWatts}W</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(imp)}
                        className="text-blue-600 hover:text-blue-800 p-2"
                        title="Editar"
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeletar(imp.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Deletar"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulário de Edição/Adição */}
          {(editando || adicionando) && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {editando ? "Editar Impressora" : "Nova Impressora"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID (identificador único)
                  </label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={(e) => handleInputChange("id", e.target.value)}
                    placeholder="ex: nova_impressora"
                    disabled={!!editando}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none disabled:bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Use snake_case (sem espaços)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Impressora
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="ex: Creality Ender 3 V3 Se"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço de Compra (R$)
                  </label>
                  <input
                    type="number"
                    value={formData.precoCompra}
                    onChange={(e) => handleInputChange("precoCompra", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    step="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consumo Elétrico (Watts)
                  </label>
                  <input
                    type="number"
                    value={formData.consumoWatts}
                    onChange={(e) => handleInputChange("consumoWatts", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    step="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vida Útil Estimada (horas)
                  </label>
                  <input
                    type="number"
                    value={formData.vidaUtiHoras}
                    onChange={(e) => handleInputChange("vidaUtiHoras", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    step="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custo Manutenção Mensal (R$)
                  </label>
                  <input
                    type="number"
                    value={formData.custoManutencaoMensal}
                    onChange={(e) => handleInputChange("custoManutencaoMensal", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    step="10"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3">
                <button
                  onClick={handleSalvar}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Salvar
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-gray-200 bg-white p-6 flex gap-3">
          <button
            onClick={handleSalvarTodas}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Salvar Todas as Impressoras
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
