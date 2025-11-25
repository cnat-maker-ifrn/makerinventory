import { useEffect, useState } from "react";
import { MdCheck } from "react-icons/md";

interface Item {
    id: number;
    nome: string;
    codigo: string;
}

interface Lote {
    id: number;
    produto: string;
    codigo: string;
    quantidade_disponivel: number;
}

export default function AddSaida() {
    const [tipo, setTipo] = useState<"item" | "lote" | "">("");
    const [items, setItems] = useState<Item[]>([]);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [selectedLote, setSelectedLote] = useState<number | null>(null);
    const [quantidade, setQuantidade] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [observacao, setObservacao] = useState("");

    // -----------------------------------------------------
    // MOCK TEMPORÁRIO (remover quando o backend estiver ativo)
    // -----------------------------------------------------
    useEffect(() => {
        setItems([
            { id: 1, nome: "Chave Philips", codigo: "ITM001" },
            { id: 2, nome: "Multímetro", codigo: "ITM002" },
        ]);

        setLotes([
            { id: 10, produto: "PLA Preto", codigo: "LOT123", quantidade_disponivel: 2.5 },
            { id: 11, produto: "Resina UV", codigo: "LOT888", quantidade_disponivel: 1.2 },
        ]);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (tipo === "") return alert("Selecione Item ou Lote.");

        if (tipo === "item" && !selectedItem)
            return alert("Selecione um item.");

        if (tipo === "lote") {
            if (!selectedLote) return alert("Selecione um lote.");
            if (!quantidade || parseFloat(quantidade) <= 0)
                return alert("Quantidade inválida.");
        }

        alert("Saída registrada (mock).");
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-[#1A955E] mb-6">
                Registrar Saída
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow grid gap-6"
            >
                {/* Tipo */}
                <div>
                    <label className="font-semibold block mb-2">Tipo de Saída</label>
                    <select
                        className="border p-3 rounded w-full"
                        value={tipo}
                        onChange={(e) => {
                            setTipo(e.target.value as any);
                            setSelectedItem(null);
                            setSelectedLote(null);
                            setQuantidade("");
                        }}
                    >
                        <option value="">Selecione...</option>
                        <option value="item">Item</option>
                        <option value="lote">Lote (Produto fracionado)</option>
                    </select>
                </div>

                {/* Item */}
                {tipo === "item" && (
                    <div>
                        <label className="font-semibold block mb-2">Item</label>
                        <select
                            className="border p-3 rounded w-full"
                            value={selectedItem ?? ""}
                            onChange={(e) => setSelectedItem(Number(e.target.value))}
                        >
                            <option value="">Selecione...</option>
                            {items.map((it) => (
                                <option key={it.id} value={it.id}>
                                    {it.nome} — {it.codigo}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Lote */}
                {tipo === "lote" && (
                    <>
                        <div>
                            <label className="font-semibold block mb-2">Lote</label>
                            <select
                                className="border p-3 rounded w-full"
                                value={selectedLote ?? ""}
                                onChange={(e) => setSelectedLote(Number(e.target.value))}
                            >
                                <option value="">Selecione...</option>
                                {lotes.map((lt) => (
                                    <option key={lt.id} value={lt.id}>
                                        {lt.codigo} — {lt.produto} (disp. {lt.quantidade_disponivel})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="font-semibold block mb-2">Quantidade</label>
                            <input
                                type="number"
                                step="0.01"
                                className="border p-3 rounded w-full"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                            />
                        </div>
                    </>
                )}

                {/* Responsável */}
                <div>
                    <label className="font-semibold block mb-2">Responsável</label>
                    <input
                        type="text"
                        className="border p-3 rounded w-full"
                        value={responsavel}
                        onChange={(e) => setResponsavel(e.target.value)}
                    />
                </div>

                {/* Observação */}
                <div>
                    <label className="font-semibold block mb-2">Observação</label>
                    <textarea
                        className="border p-3 rounded w-full"
                        rows={3}
                        value={observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-[#1A955E] text-white py-3 rounded-lg hover:bg-[#1A855E]"
                >
                    <MdCheck size={24} />
                    Registrar Saída
                </button>
            </form>
        </div>
    );
}
