import CardEstoqueBaixo from "../components/dashboard/CardEstoqueBaixo"
import CardGraficoEntradaSaida from "../components/dashboard/CardGraficoEntradaSaida"
import CardLotesMaisUsados from "../components/dashboard/CardLotesMaisUsados"

export default function Dashboard(){
    return(
        <>
        <div className="flex gap-2">
            <div className="flex flex-col gap-2">
                <CardEstoqueBaixo />
                <CardGraficoEntradaSaida />
            </div>
                <CardLotesMaisUsados />
        </div>
        </>
    )
}