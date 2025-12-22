import { useState } from "react";
import { useAuth } from "../hooks/autenticacao/useAuth";

import SearchBar from "../components/utils/SearchBar"
import TableLote from "../components/lote/TableLote"
import AddLoteButton from "../components/lote/AddLoteButton"

export default function Lote() {
    const { isAuthenticated } = useAuth();
    const [busca, setBusca] = useState("");

    return(
        <>
            <h1 className="text-3xl font-bold text-[#1A955E] mb-6">Lotes</h1>
            <SearchBar
                value={busca}
                onChange={setBusca}
                placeholder="Buscar lote..."
            />
            {isAuthenticated && (
                <div className="mb-4">
                    <AddLoteButton />
                </div>
            )}
            <TableLote search={busca}/>
        </>
    )
}