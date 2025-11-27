import { useEffect, useState } from "react";
import { getSubcategorias, type Subcategoria } from "../../api/subcategoriaApi";
import { createProdutoUnitario, createProdutoFracionado } from "../../api/produtoApi";

interface AddProdutoModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (produto: any) => void;
}

export default function AddProdutoModal({ open, onClose, onCreated }: AddProdutoModalProps) {
  const [tipo, setTipo] = useState<"unitario" | "fracionado">("unitario");
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!open) return;
    let ativo = true;

    getSubcategorias()
      .then((data) => { if (ativo) setSubcategorias(data); })
      .catch(console.error);

    return () => { ativo = false; };
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const nome = form.get("nome");
    const subcategoria = form.get("subcategoria");

    if (!nome || !subcategoria) {
      setErro("Todos os campos são obrigatórios");
      setLoading(false);
      return;
    }

    try {
      let produtoCriado: any = null;

      if (tipo === "unitario") {
        produtoCriado = await createProdutoUnitario(form);
      } else {
        produtoCriado = await createProdutoFracionado(form);
      }

      if (onCreated) onCreated(produtoCriado);

      onClose();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Cadastrar produto</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipo */}
          <div>
            <label className="block mb-1 font-semibold">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as "unitario" | "fracionado")}
              className="w-full border rounded-md p-2"
            >
              <option value="unitario">Produto Unitário</option>
              <option value="fracionado">Produto Fracionado</option>
            </select>
          </div>

          {/* Subcategoria */}
          <div>
            <label className="block mb-1 font-semibold">Subcategoria</label>
            <select name="subcategoria" required className="w-full border rounded-md p-2">
              <option value="">Selecione...</option>
              {subcategorias.map((s) => (
                <option key={s.id} value={s.id}>{s.nome}</option>
              ))}
            </select>
          </div>

          {/* Nome */}
          <div>
            <label className="block mb-1 font-semibold">Nome</label>
            <input type="text" name="nome" required className="w-full border rounded-md p-2" placeholder="Nome do produto" />
          </div>

          {/* Foto */}
          <div>
            <label className="block mb-1 font-semibold">Foto (opcional)</label>
            <input type="file" name="foto" accept="image/*" />
          </div>

          {/* Campos específicos */}
          {tipo === "unitario" && (
            <div>
              <label className="block mb-1 font-semibold">Quantidade mínima</label>
              <input type="number" name="quantidade_minima" min={0} step={1} required className="w-full border rounded-md p-2" />
            </div>
          )}
          {tipo === "fracionado" && (
            <>
              <div>
                <label className="block mb-1 font-semibold">Unidade de medida</label>
                <select name="unidade_de_medida" required className="w-full border rounded-md p-2">
                  <option value="">Selecione...</option>
                  <option value="kg">Quilograma</option>
                  <option value="g">Grama</option>
                  <option value="l">Litro</option>
                  <option value="ml">Mililitro</option>
                  <option value="m">Metro</option>
                  <option value="cm">Centímetro</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Quantidade mínima</label>
                <input type="number" name="quantidade_minima" step={0.01} min={0} required className="w-full border rounded-md p-2" />
              </div>
            </>
          )}

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          {/* Botões */}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 border rounded-md">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-[#29854A] text-white rounded-md hover:bg-[#246f3f]">
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
