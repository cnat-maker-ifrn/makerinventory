import { useState } from "react";
import SearchBar from "../components/utils/SearchBar";
import ListMovimentacao from "../components/movimentacao/ListMovimentacao";
import type { Mov } from "../components/movimentacao/ListMovimentacao";

export default function Movimentacao() {
    const [busca, setBusca] = useState("");       // adicionando busca
    const [dados, setDados] = useState<Mov[]>([]); // correto

    return (
        <>
            <SearchBar
                value={busca}
                onChange={setBusca}
                placeholder="Buscar movimentação..."
            />

            <ListMovimentacao dados={dados} />
        </>
    );
}
