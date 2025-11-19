import AddItem from "../components/utils/AddItemButton"
import AddLote from "../components/utils/AddLote"
import Filter from "../components/utils/Filter"
import TableProduto from "../components/produto/TableProduto"

export default function Produto() {
    return(
        <>
            <h1 className="text-3xl font-bold text-[#29854A] mb-6">Produtos</h1>
            <div className="flex gap-4">
                <AddItem />
                <AddLote />
                <Filter />
            </div>
            <TableProduto />
        </>
    )
}