import type { ProdutoFracionado } from "./produtofracionado";

export interface Lote {
    id: number;
    foto: string | null;
    preco: number;
    fornecedor: string | null;
    produto: ProdutoFracionado; 
    produto_id?: number;        
    quantidade: number;
    data_validade: string | null;
    data_entrada: string;
    codigo: string;
    nome: string;
    unidade_de_medida?: string;
    qrcode?: string | null;
}
