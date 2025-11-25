import { useState } from "react";

import SearchBar from "../components/utils/SearchBar"
import TableItem from "../components/item/TableItem"
import AddItemButton from "../components/utils/AddItemButton"

export default function Item(){
    const [busca, setBusca] = useState("");
    return(
        <>
            <h1 className="text-3xl font-bold text-[#1A955E] mb-6">Itens</h1>
            <SearchBar
                value={busca}
                onChange={setBusca}
                placeholder="Buscar item..."
            />

            <div className="flex mb-4">
                <AddItemButton />
            </div>
            <TableItem />        
        </>
    )
}
