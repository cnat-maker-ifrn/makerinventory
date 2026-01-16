export interface Movimentacao {
    id: number;
    produto_nome: string;
    tipo_movimentacao: string; // entrada | saida | emprestimo | devolucao
    quantidade: number;
    data_movimentacao: string;
    item: number | null;
    lote: number | null;
    saida: number | null;
    emprestimo: number | null;
    devolucao: number | null;
    unidade_de_medida?: string | null;
}
