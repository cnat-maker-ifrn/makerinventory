import AddItem from "../components/utils/AddItem"
import AddLote from "../components/utils/AddLote"
import Filter from "../components/utils/Filter"
import TableProduto from "../components/produtos/TableProduto"

export default function Produto() {
    return(
        <>
            <div className="flex gap-4">
                <AddItem />
                <AddLote />
                <Filter />
            </div>
            <TableProduto />
        </>
    )
}