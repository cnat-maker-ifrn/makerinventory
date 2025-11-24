import { useEffect, useState } from "react";

interface Subcategoria {
  id: number;
  nome: string;
}

interface AddProdutoModalProps {
  open: boolean;
  onClose: () => void;
  /**
   * Opcional: callback que recebe o objeto criado (se a API retornar o objeto criado)
   * para atualizar listas na página pai sem recarregar.
   */
  onCreated?: (created: any) => void;
}

export default function AddProdutoModal({ open, onClose, onCreated }: AddProdutoModalProps) {
  const [tipo, setTipo] = useState<"unitario" | "fracionado">("unitario");
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string>("");

  // Carrega subcategorias (GET /api/subcategorias/)
  useEffect(() => {
    if (!open) return; // evita requisição quando modal fechado

    let mounted = true;
    async function fetchSubcategorias() {
      try {
        const resp = await fetch("http://localhost:8000/api/subcategorias/");
        if (!resp.ok) {
          throw new Error(`Erro ao carregar subcategorias (${resp.status})`);
        }
        const data = await resp.json();
        if (mounted) setSubcategorias(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (mounted) setErro("Não foi possível carregar subcategorias.");
      }
    }

    fetchSubcategorias();

    return () => {
      mounted = false;
    };
  }, [open]);

  // garante que hooks sejam sempre chamados antes do return condicional
  if (!open) return null;

  // Envia para endpoint correto dependendo do tipo
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const formEl = e.currentTarget;
      const formData = new FormData(formEl);

      // Campos específicos: garantir nomes coerentes com seu backend
      // nome (string), subcategoria (id), foto (file), quantidade_minima, unidade_de_medida (se fracionado)
      // Certifique-se que os inputs do form usem exatamente estes `name` attributes:

      // Endpoint dinâmico
      const url =
        tipo === "unitario"
          ? "http://localhost:8000/api/produtos-unitarios/"
          : "http://localhost:8000/api/produtos-fracionados/";

      // Para ter certeza que o backend saiba do tipo, não é necessário enviar um campo adicional
      // porque estamos usando endpoints diferentes. Se quiser enviar, descomente:
      // formData.append("tipo", tipo);

      const resp = await fetch(url, {
        method: "POST",
        body: formData, // multipart/form-data automático (não passar Content-Type)
      });

      if (!resp.ok) {
        // tenta decodificar JSON de erro do DRF, senão pega texto
        let errMsg = `Erro ao salvar (status ${resp.status})`;
        try {
          const errJson = await resp.json();
          // DRF geralmente retorna { field: [errors], ... } ou { detail: "..." }
          if (errJson.detail) errMsg = errJson.detail;
          else {
            // concatena mensagens de erro por campo se houver
            const fields = Object.keys(errJson)
              .map((k) => `${k}: ${JSON.stringify(errJson[k])}`)
              .join(" | ");
            if (fields) errMsg = fields;
          }
        } catch {
          // se não for JSON, tenta texto bruto
          try {
            const text = await resp.text();
            if (text) errMsg = text;
          } catch {}
        }
        throw new Error(errMsg);
      }

      // tenta pegar o objeto criado (se a API retornar)
      let created = null;
      try {
        created = await resp.json();
      } catch {}

      // callback opcional para o componente pai atualizar listas
      if (onCreated && created) onCreated(created);

      // fecha modal
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
          {/* Tipo de produto */}
          <div>
            <label className="block mb-1 font-semibold">Tipo</label>
            <select
              className="w-full border rounded-md p-2"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as "unitario" | "fracionado")}
            >
              <option value="unitario">Produto Unitário</option>
              <option value="fracionado">Produto Fracionado</option>
            </select>
          </div>

          {/* Subcategoria (carregada da API) */}
          <div>
            <label className="block mb-1 font-semibold">Subcategoria</label>
            <select name="subcategoria" required className="w-full border rounded-md p-2">
              <option value="">Selecione...</option>
              {subcategorias.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Nome */}
          <div>
            <label className="block mb-1 font-semibold">Nome</label>
            <input
              name="nome"
              type="text"
              required
              className="w-full border rounded-md p-2"
              placeholder="Nome do produto"
            />
          </div>

          {/* Foto */}
          <div>
            <label className="block mb-1 font-semibold">Foto (opcional)</label>
            <input name="foto" type="file" accept="image/*" />
          </div>

          {/* Campos por tipo */}
          {tipo === "unitario" && (
            <div>
              <label className="block mb-1 font-semibold">Quantidade mínima</label>
              <input
                name="quantidade_minima"
                type="number"
                min="0"
                step="1"
                required
                className="w-full border rounded-md p-2"
              />
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
                <input
                  name="quantidade_minima"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
            </>
          )}

          {/* Mensagem de erro */}
          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          {/* Ações */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#29854A] text-white rounded-md hover:bg-[#246f3f]"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
