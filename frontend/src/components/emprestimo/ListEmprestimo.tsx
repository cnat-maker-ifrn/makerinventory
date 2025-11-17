import { useEffect, useState } from "react";
import {
    MdSearch,
    MdVisibility,
    MdAssignmentReturn,
} from "react-icons/md";

interface Emprestimo {
    id: number;
    solicitante: string;
    data_emprestimo: string;
    previsao_entrega: string;
    data_entrega?: string | null;
}

// Função para evitar erros ao formatar datas
function safeDate(dateString?: string | null) {
    if (!dateString) return "—";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString();
}

export default function ListEmprestimo() {
    const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        // ------------------------
        // 🔧 MOCK LOCAL TEMPORÁRIO
        // ------------------------
        const MOCK = [
            {
                id: 1,
                solicitante: "Lucas Tales",
                data_emprestimo: "2025-01-10",
                previsao_entrega: "2025-01-15",
                data_entrega: null,
            },
            {
                id: 2,
                solicitante: "Maria Silva",
                data_emprestimo: "2025-02-03",
                previsao_entrega: "2025-02-07",
                data_entrega: "2025-02-06",
            },
        ];

        setEmprestimos(MOCK);

        // Quando o backend estiver ligado:
        /*
        const getData = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/emprestimos/");
                if (!res.ok) throw new Error("Erro ao buscar empréstimos");
                
                const data = await res.json();
                if (!Array.isArray(data)) throw new Error("Formato inválido");

                setEmprestimos(data);
            } catch (err) {
                console.error("Erro:", err);
                setEmprestimos([]);
            }
        };

        getData();
        */
    }, []);

    const filtrados = emprestimos.filter((e) =>
        e.solicitante?.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-[#29854A]">
                Empréstimos
            </h1>

            {/* Barra de busca */}
            <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-lg shadow">
                <MdSearch size={28} className="text-gray-600" />
                <input
                    type="text"
                    placeholder="Buscar por solicitante..."
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
                            <th className="p-4">Solicitante</th>
                            <th className="p-4">Empréstimo</th>
                            <th className="p-4">Previsão Entrega</th>
                            <th className="p-4">Devolução</th>
                            <th className="p-4 text-center">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtrados.map((emp) => (
                            <tr
                                key={emp.id}
                                className="hover:bg-gray-100 transition"
                            >
                                <td className="p-4">{emp.solicitante}</td>
                                <td className="p-4">{safeDate(emp.data_emprestimo)}</td>
                                <td className="p-4">{safeDate(emp.previsao_entrega)}</td>
                                <td className="p-4">{safeDate(emp.data_entrega)}</td>

                                <td className="p-4 flex justify-center gap-4">
                                    <button className="p-2 rounded-full hover:bg-gray-200">
                                        <MdVisibility size={28} className="text-[#29854A]" />
                                    </button>

                                    <button className="p-2 rounded-full hover:bg-gray-200">
                                        <MdAssignmentReturn size={28} className="text-[#29854A]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtrados.length === 0 && (
                    <p className="text-center p-6 text-gray-600">
                        Nenhum empréstimo encontrado.
                    </p>
                )}
            </div>
        </div>
    );
}
