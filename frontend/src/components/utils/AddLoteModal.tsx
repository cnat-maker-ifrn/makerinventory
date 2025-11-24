interface AddLoteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddLoteModal({ open, onClose }: AddLoteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">

        <h2 className="text-xl font-semibold mb-4">Cadastrar novo lote</h2>

        <form className="space-y-4">
          {/* Produto fracionado */}
          <div>
            <label className="block mb-1 font-semibold">Produto fracionado</label>
            <select className="w-full border rounded-md p-2">
              <option>Selecione...</option>
            </select>
          </div>

          {/* Quantidade */}
          <div>
            <label className="block mb-1 font-semibold">Quantidade</label>
            <input
              type="number"
              step="0.01"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Preço */}
          <div>
            <label className="block mb-1 font-semibold">Preço</label>
            <input
              type="number"
              step="0.01"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Fornecedor */}
          <div>
            <label className="block mb-1 font-semibold">Fornecedor</label>
            <input
              type="text"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Data de validade */}
          <div>
            <label className="block mb-1 font-semibold">Data de validade</label>
            <input
              type="date"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Foto */}
          <div>
            <label className="block mb-1 font-semibold">Foto (opcional)</label>
            <input type="file" />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#29854A] text-white rounded-md hover:bg-[#246f3f]"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
