import AddSaidaButton from "../components/saida/AddSaidaButton"
import TableSaida from "../components/saida/TableSaida"

export default function Saida(){
    return(
        <>
            <h1 className="text-3xl font-bold text-[#1A955E] mb-6"> Saídas</h1>
            <div className="mb-4">
                <AddSaidaButton />
            </div>
            <TableSaida />
        </>
    )
}