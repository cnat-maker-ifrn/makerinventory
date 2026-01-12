import type { ProdutoFracionado } from "./produtofracionado";

export interface Lote {
    id: number;
    foto: string | null;
    preco: number;
    fornecedor: string | null;
    produto: ProdutoFracionado; // read-only
    produto_id?: number;        // write-only
    quantidade: number;
    data_validade: string | null;
    data_entrada: string;
    codigo: string;
    nome: string;
    unidade_de_medida?: string; // unidade do produto fracionado
}
