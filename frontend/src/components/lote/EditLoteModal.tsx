import { useState, useEffect } from "react";
import { updateLote } from "../../api/loteApi";

interface Lote {
    id: number;
    foto: string | null;
    preco: number | string;
    data_validade?: string | null;
    [key: string]: any;
}

interface EditLoteModalProps {
    open: boolean;
    lote: Lote | null;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function EditLoteModal({
    open,
    lote,
    onClose,
    onSuccess,
}: EditLoteModalProps) {
    const [preco, setPreco] = useState("");
    const [foto, setFoto] = useState<File | null>(null);
    const [dataValidade, setDataValidade] = useState("");
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (open && lote) {
            setPreco(String(lote.preco));
            setFoto(null);
            setPreview(lote.foto);
            setErro("");
            if (lote.data_validade) {
                setDataValidade(lote.data_validade.split("T")[0]);
            } else {
                setDataValidade("");
            }
        }
    }, [open, lote]);

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!lote) return;

        setLoading(true);
        setErro("");

        try {
            const form = new FormData();
            form.append("preco", preco);

            if (dataValidade) {
                form.append("data_validade", dataValidade);
            }

            if (foto) {
                form.append("foto", foto);
            }

            await updateLote(lote.id, form);
            if (onSuccess) onSuccess();
            onClose();
        } catch (e: any) {
            const data = e?.response?.data;
            let msg = "Erro ao atualizar lote";

            if (data) {
                if (typeof data === "string") {
                    msg = data;
                } else if (data.detail) {
                    msg = data.detail;
                } else {
                    const key = Object.keys(data)[0];
                    msg = Array.isArray(data[key]) ? data[key][0] : data[key];
                }
            }

            setErro(msg);
        } finally {
            setLoading(false);
        }
    }

    if (!open || !lote) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Editar Lote</h2>

                {erro && (
                    <p className="text-red-600 text-sm mb-3">{erro}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Foto */}
                    <div>
                        <label className="block font-medium mb-1">Foto</label>
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-40 object-cover rounded mb-2"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border rounded px-3 py-2 
             file:mr-5 file:py-1 file:px-4 
             file:rounded-border file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100"
                            onChange={handleFotoChange}
                            disabled={loading}
                        />
                    </div>

                    {/* Preço */}
                    <div>
                        <label className="block font-medium mb-1">Preço</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            className="w-full border rounded px-3 py-2"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Validade */}
                    <div>
                        <label className="block font-medium mb-1">Data de validade</label>
                        <input
                            type="date"
                            className="w-full border rounded px-3 py-2"
                            value={dataValidade}
                            onChange={(e) => setDataValidade(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Botões */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#29854A] text-white rounded hover:bg-[#246f3f]"
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
