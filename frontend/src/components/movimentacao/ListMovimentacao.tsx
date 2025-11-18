import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

interface Mov {
    id: number;
    produto_nome: string;
    tipo_movimentacao: string;
    quantidade: number;
    data_movimentacao: string;
    origem: string;
}

export default function ListMovimentacao() {
    const [movs, setMovs] = useState<Mov[]>([]);
    const [busca, setBusca] = useState("");

    // MOCK TEMPORÁRIO
    useEffect(() => {
        setMovs([
            {
                id: 1,
                produto_nome: "PLA Preto",
                tipo_movimentacao: "saida",
                quantidade: 0.3,
                data_movimentacao: "2025-01-05T10:20:00",
                origem: "Saída #12",
            },
            {
                id: 2,
                produto_nome: "Chave Philips",
                tipo_movimentacao: "emprestimo",
                quantidade: 1,
                data_movimentacao: "2025-01-06T09:10:00",
                origem: "Empréstimo #5",
            },
        ]);
    }, []);

    const filtrados = movs.filter((m) =>
        m.produto_nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-[#29854A] mb-6">
                Movimentações
            </h1>

            {/* Busca */}
            <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-lg shadow">
                <MdSearch size={28} className="text-gray-600" />
                <input
                    type="text"
                    placeholder="Buscar produto..."
                    className="flex-1 outline-none text-[18px]"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            {/* Tabela */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#29854A] text-white text-[18px]">
                        <tr>
                            <th className="p-4">Produto</th>
                            <th className="p-4">Tipo</th>
                            <th className="p-4">Quantidade</th>
                            <th className="p-4">Data</th>
                            <th className="p-4">Origem</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtrados.map((m) => (
                            <tr key={m.id} className="hover:bg-gray-100 transition">
                                <td className="p-4">{m.produto_nome}</td>
                                <td className="p-4">{m.tipo_movimentacao}</td>
                                <td className="p-4">{m.quantidade}</td>
                                <td className="p-4">
                                    {new Date(m.data_movimentacao).toLocaleString()}
                                </td>
                                <td className="p-4">{m.origem}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtrados.length === 0 && (
                    <p className="text-center p-6 text-gray-600">Nenhuma movimentação.</p>
                )}
            </div>
        </div>
    );
}
