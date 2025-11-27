import type { Mov } from "../components/movimentacao/ListMovimentacao";
import api from "./api"; 

export async function getMovimentacoes(busca: string = ""): Promise<Mov[]> {
    const params = busca ? { search: busca } : {};

    const response = await api.get("movimentacoes/", { params });
    return response.data;
}
