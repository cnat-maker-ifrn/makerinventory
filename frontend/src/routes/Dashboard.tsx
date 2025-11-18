import CardEstoqueBaixo from "../components/dashboard/CardEstoqueBaixo"
import CardGraficoEntradaSaida from "../components/dashboard/CardGraficoEntradaSaida"

export default function Dashboard(){
    return(
        <>
            <div className="flex flex-col gap-4">
                <CardEstoqueBaixo />
                <CardGraficoEntradaSaida />
            </div>
        </>
    )
}