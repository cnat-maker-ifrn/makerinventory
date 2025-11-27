import { useState } from "react";
import SearchBar from "../components/utils/SearchBar";
import ListMovimentacao from "../components/movimentacao/ListMovimentacao";
import { useMovimentacoes } from "../hooks/movimentacao/useMovimentacoes";

export default function Movimentacao() {
    const [busca, setBusca] = useState("");

    const { dados, loading, erro } = useMovimentacoes(busca);

    return (
        <>
            <h1 className="text-3xl font-bold text-[#1A955E] mb-6">Movimentações</h1>

            <SearchBar value={busca} onChange={setBusca} placeholder="Buscar movimentação..." />

            {loading && <p>Carregando...</p>}
            {erro && <p className="text-red-500">{erro}</p>}

            {!loading && !erro && <ListMovimentacao dados={dados} />}
        </>
    );
}
