export interface ProdutoUnitario {
    id: number;
    subcategoria: number;
    subcategoria_nome: string;
    foto: string | null;
    nome: string;
    quantidade_minima: number;
    quantidade_em_estoque: number;
}
