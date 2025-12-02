export interface Devolucao {
    id: number;
    emprestimo: number;
    emprestimo_id: number;
    itens: number[];
    data_devolucao: string;
    observacao: string | null;
}
