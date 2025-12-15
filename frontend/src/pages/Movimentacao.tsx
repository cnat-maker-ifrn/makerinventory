import { useState } from "react";
import SearchBar from "../components/utils/SearchBar";
import { TableMovimentacao } from "../components/movimentacao/TableMovimentacao";
import { useMovimentacoes } from "../hooks/movimentacao/useMovimentacoes";

export default function Movimentacao() {
    const [busca, setBusca] = useState("");
    const { dados, loading, erro } = useMovimentacoes();

    const filtrados = dados.filter(m => {
        const texto =
            `${m.produto_nome ?? ""} ` +
            `${m.tipo_movimentacao ?? ""} ` +
            `${m.quantidade ?? ""} ` +
            `${m.data_movimentacao ?? ""}`;

        return texto.toLowerCase().includes(busca.toLowerCase());
    });

    return (
        <>
            <h1 className="text-3xl font-bold text-[#1A955E] mb-6">
                Movimentações
            </h1>

            <SearchBar
                value={busca}
                onChange={setBusca}
                placeholder="Buscar movimentação..."
            />

            {loading && <p>Carregando...</p>}
            {erro && <p className="text-red-500">{erro}</p>}

            {!loading && !erro && (
                <TableMovimentacao dados={filtrados} />
            )}
        </>
    );
}
