export interface Emprestimo {
    id: number;
    solicitante: number;
    solicitante_nome: string;
    itens: number[]; // somente IDs
    data_emprestimo: string;
    previsao_entrega: string;
    data_entrega: string | null;
    responsavel: string;
}
